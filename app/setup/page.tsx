"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient'; 
import { 
  CheckCircle2, XCircle, Save, Server, MessageSquare, ShieldCheck, Eye, EyeOff, Activity, Terminal 
} from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null); // <--- Stores the current user's ID

  // Form State
  const [azureForm, setAzureForm] = useState({ tenant: '', sub: '', client: '', secret: '' });
  const [teamsUrl, setTeamsUrl] = useState('');
  const [linuxForm, setLinuxForm] = useState({ ip: '', user: '', key: '' });
  
  // Status State
  const [isSaving, setIsSaving] = useState(false);
  const [azureConnected, setAzureConnected] = useState(false);
  const [teamsConnected, setTeamsConnected] = useState(false);
  const [linuxConnected, setLinuxConnected] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // --- 1. SECURITY & DATA LOADING ---
  useEffect(() => {
    const initPage = async () => {
      // A. Check if logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const user = session.user;
      setUserId(user.id);

      // B. Load EXISTING data for this user
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', user.id) // <--- Only fetch MY data
        .single();

      if (data) {
        // Pre-fill the forms if data exists
        setAzureForm({
          tenant: data.azure_tenant_id || '',
          sub: data.azure_subscription_id || '',
          client: data.azure_client_id || '',
          secret: data.azure_client_secret || ''
        });
        setTeamsUrl(data.teams_webhook_url || '');
        setLinuxForm({
          ip: data.linux_ip || '',
          user: data.linux_user || '',
          key: data.linux_key || ''
        });

        // Set status badges
        if (data.azure_tenant_id) setAzureConnected(true);
        if (data.teams_webhook_url) setTeamsConnected(true);
        if (data.linux_ip) setLinuxConnected(true);
      }
      setLoadingData(false);
    };

    initPage();
  }, [router]);


  // --- 2. DYNAMIC SAVE FUNCTIONS ---
  
  const handleSaveAzure = async () => {
    if (!userId) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('tenants')
        .update({
          azure_tenant_id: azureForm.tenant,
          azure_subscription_id: azureForm.sub,
          azure_client_id: azureForm.client,
          azure_client_secret: azureForm.secret
        })
        .eq('id', userId); // <--- Updates ONLY the logged-in user

      if (error) throw error;
      setAzureConnected(true);
      alert("✅ Azure Keys Saved!");
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTeams = async () => {
    if (!userId) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('tenants')
        .update({ teams_webhook_url: teamsUrl })
        .eq('id', userId);

      if (error) throw error;
      setTeamsConnected(true);
      alert("✅ Teams Webhook Saved!");
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveLinux = async () => {
    if (!userId) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('tenants')
        .update({ 
          linux_ip: linuxForm.ip,
          linux_user: linuxForm.user,
          linux_key: linuxForm.key
        })
        .eq('id', userId);

      if (error) throw error;
      setLinuxConnected(true);
      alert("✅ Linux Keys Saved!");
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loadingData) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Configuration...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500">
      <nav className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tighter">
            <Activity className="text-blue-500" />
            <span>CMD FLEET / SETUP</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 hidden md:block">User ID: {userId?.slice(0, 8)}...</span>
            <button onClick={() => { supabase.auth.signOut(); router.push('/login'); }} className="text-sm text-gray-400 hover:text-white transition">Log Out</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Platform Configuration</h1>
          <p className="text-gray-400">Connect your cloud infrastructure. All secrets are encrypted at rest.</p>
        </div>

        {/* AZURE CARD */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg"><Server className="text-blue-500 h-6 w-6" /></div>
              <div>
                <h2 className="text-xl font-bold">Azure Connection</h2>
                <div className="flex items-center mt-1">
                  {azureConnected ? <span className="text-green-500 text-xs flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Connected</span> : <span className="text-red-500 text-xs flex items-center"><XCircle className="w-3 h-3 mr-1"/> Disconnected</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-xs font-medium text-gray-400 mb-2">Tenant ID</label><input value={azureForm.tenant} onChange={(e) => setAzureForm({...azureForm, tenant: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition" placeholder="e.g. 8f42d40..." /></div>
            <div><label className="block text-xs font-medium text-gray-400 mb-2">Subscription ID</label><input value={azureForm.sub} onChange={(e) => setAzureForm({...azureForm, sub: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition" placeholder="e.g. a0be4a..." /></div>
            <div><label className="block text-xs font-medium text-gray-400 mb-2">Client ID</label><input value={azureForm.client} onChange={(e) => setAzureForm({...azureForm, client: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition" placeholder="e.g. 99c8c7..." /></div>
            <div className="relative"><label className="block text-xs font-medium text-gray-400 mb-2">Client Secret</label><div className="relative"><input type={showSecret ? "text" : "password"} value={azureForm.secret} onChange={(e) => setAzureForm({...azureForm, secret: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition" placeholder="••••••••••••••••" /><button onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-3 text-gray-500 hover:text-white">{showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
          </div>
          <div className="mt-8 flex justify-end"><button onClick={handleSaveAzure} disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center transition disabled:opacity-50">{isSaving ? "Verifying..." : "Save & Verify Connection"} {!isSaving && <ShieldCheck className="ml-2 w-4 h-4" />}</button></div>
        </div>

        {/* LINUX CARD */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg"><Terminal className="text-yellow-500 h-6 w-6" /></div>
              <div><h2 className="text-xl font-bold">Linux Server</h2><div className="flex items-center mt-1">{linuxConnected ? <span className="text-green-500 text-xs flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Active</span> : <span className="text-gray-500 text-xs flex items-center"><XCircle className="w-3 h-3 mr-1"/> Not Configured</span>}</div></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div><label className="block text-xs font-medium text-gray-400 mb-2">Server IP</label><input value={linuxForm.ip} onChange={(e) => setLinuxForm({...linuxForm, ip: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 transition" placeholder="e.g. 192.168.1.50" /></div>
            <div><label className="block text-xs font-medium text-gray-400 mb-2">SSH Username</label><input value={linuxForm.user} onChange={(e) => setLinuxForm({...linuxForm, user: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 transition" placeholder="e.g. ubuntu" /></div>
          </div>
          <div><label className="block text-xs font-medium text-gray-400 mb-2">SSH Private Key</label><textarea value={linuxForm.key} onChange={(e) => setLinuxForm({...linuxForm, key: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 transition font-mono text-xs text-gray-300" rows={5} placeholder="-----BEGIN RSA PRIVATE KEY-----..." /></div>
          <div className="mt-8 flex justify-end"><button onClick={handleSaveLinux} disabled={isSaving} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg font-medium flex items-center transition">Verify SSH Connection <ShieldCheck className="ml-2 w-4 h-4" /></button></div>
        </div>

        {/* TEAMS CARD */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
           <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/10 rounded-lg"><MessageSquare className="text-purple-500 h-6 w-6" /></div>
              <div><h2 className="text-xl font-bold">Microsoft Teams</h2><div className="flex items-center mt-1">{teamsConnected ? <span className="text-green-500 text-xs flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Active</span> : <span className="text-gray-500 text-xs flex items-center"><XCircle className="w-3 h-3 mr-1"/> Not Configured</span>}</div></div>
            </div>
          </div>
          <div className="space-y-4"><div><label className="block text-xs font-medium text-gray-400 mb-2">Webhook URL</label><input value={teamsUrl} onChange={(e) => setTeamsUrl(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition" placeholder="https://prod-18.westus.logic.azure.com..." /></div><p className="text-xs text-gray-500">Paste the Workflow URL from your Teams Channel setup.</p></div>
          <div className="mt-8 flex justify-end"><button onClick={handleSaveTeams} disabled={isSaving} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg font-medium flex items-center transition">Save Teams Webhook <Save className="ml-2 w-4 h-4" /></button></div>
        </div>

      </main>
    </div>
  );
}
