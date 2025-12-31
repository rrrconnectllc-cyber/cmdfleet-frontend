"use client";

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Save, 
  Server, 
  MessageSquare, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Activity,
  Terminal // <--- New Icon for Linux
} from 'lucide-react';

export default function SetupPage() {
  const [showSecret, setShowSecret] = useState(false);
  const [azureConnected, setAzureConnected] = useState(false);
  const [teamsConnected, setTeamsConnected] = useState(false);
  const [linuxConnected, setLinuxConnected] = useState(false); // <--- New State

  // Simulated Loading State
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAzure = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); setAzureConnected(true); alert("✅ Azure Connection Verified!"); }, 1500);
  };

  const handleSaveTeams = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); setTeamsConnected(true); alert("✅ Teams Test Message Sent!"); }, 1500);
  };

  // New Linux Handler
  const handleSaveLinux = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); setLinuxConnected(true); alert("✅ SSH Connection Established!"); }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500">
      
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tighter">
            <Activity className="text-blue-500" />
            <span>CMD FLEET / SETUP</span>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">Back to Home</a>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Platform Configuration</h1>
          <p className="text-gray-400">Connect your hybrid infrastructure. All secrets are encrypted at rest.</p>
        </div>

        {/* 1. AZURE CONFIGURATION CARD */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Server className="text-blue-500 h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Azure Connection</h2>
                <div className="flex items-center mt-1">
                  {azureConnected ? (
                    <span className="flex items-center text-xs text-green-500 font-medium"><CheckCircle2 className="w-3 h-3 mr-1" /> Connected</span>
                  ) : (
                    <span className="flex items-center text-xs text-red-500 font-medium"><XCircle className="w-3 h-3 mr-1" /> Disconnected</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Tenant ID" placeholder="e.g. 8f42d40..." />
            <InputField label="Subscription ID" placeholder="e.g. a0be4a..." />
            <InputField label="Client ID (App Registration)" placeholder="e.g. 99c8c7..." />
            
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-2">Client Secret</label>
              <div className="relative">
                <input 
                  type={showSecret ? "text" : "password"} 
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                  placeholder="••••••••••••••••"
                />
                <button onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-3 text-gray-500 hover:text-white">
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
             <button onClick={handleSaveAzure} disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center transition disabled:opacity-50">
               {isSaving ? "Verifying..." : "Save & Verify Connection"}
               {!isSaving && <ShieldCheck className="ml-2 w-4 h-4" />}
             </button>
          </div>
        </div>

        {/* 2. LINUX SERVER CONFIGURATION (NEW) */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Terminal className="text-yellow-500 h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Linux Server (SSH)</h2>
                <div className="flex items-center mt-1">
                  {linuxConnected ? (
                    <span className="flex items-center text-xs text-green-500 font-medium"><CheckCircle2 className="w-3 h-3 mr-1" /> Agent Active</span>
                  ) : (
                    <span className="flex items-center text-xs text-gray-500 font-medium"><XCircle className="w-3 h-3 mr-1" /> Not Configured</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InputField label="Server IP / Hostname" placeholder="e.g. 192.168.1.50" />
            <InputField label="SSH Username" placeholder="e.g. ubuntu" />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">SSH Private Key (PEM Format)</label>
            <textarea 
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 transition font-mono text-xs text-gray-300"
              rows={5}
              placeholder="-----BEGIN RSA PRIVATE KEY-----..."
            />
          </div>

          <div className="mt-8 flex justify-end">
             <button onClick={handleSaveLinux} disabled={isSaving} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg font-medium flex items-center transition">
               Verify SSH Connection
               <ShieldCheck className="ml-2 w-4 h-4" />
             </button>
          </div>
        </div>

        {/* 3. TEAMS INTEGRATION CARD */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <MessageSquare className="text-purple-500 h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Microsoft Teams</h2>
                <div className="flex items-center mt-1">
                   <span className="flex items-center text-xs text-gray-500 font-medium"><XCircle className="w-3 h-3 mr-1" /> Optional</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <InputField label="Webhook URL" placeholder="https://prod-18.westus.logic.azure.com:443/..." />
            <p className="text-xs text-gray-500">Paste the Workflow URL from your Teams Channel setup.</p>
          </div>

          <div className="mt-8 flex justify-end">
             <button onClick={handleSaveTeams} disabled={isSaving} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg font-medium flex items-center transition">
               Send Test Alert
               <Save className="ml-2 w-4 h-4" />
             </button>
          </div>
        </div>

      </main>
    </div>
  );
}

function InputField({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-2">{label}</label>
      <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition" placeholder={placeholder} />
    </div>
  );
}
