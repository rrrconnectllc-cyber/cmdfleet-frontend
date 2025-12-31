"use client";

import React from 'react';
import { ArrowRight, CheckCircle2, Terminal, Shield, Zap, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tighter">
            <Terminal className="text-blue-500" />
            <span>CMD FLEET</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            
            {/* LINK UPDATED: Points to your new Setup Dashboard */}
            <a href="/setup" className="hover:text-white transition">Login</a>
            
            <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-300">System Online v1.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              The AI IT Engineer that <br /> never sleeps.
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              AutoOps automates your Azure Identity, VM Infrastructure, and Linux maintenance. 
              Stop waking up at 3 AM for alerts. Let AI fix it.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/setup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition flex items-center justify-center group">
                Deploy AutoOps
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
              </a>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-bold text-lg transition">
                View Live Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. DASHBOARD PREVIEW */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
             <div className="rounded-lg bg-black border border-white/10 overflow-hidden relative aspect-video flex items-center justify-center">
              {/* IMAGE UPDATED: Uses your real screenshot */}
              <img 
                src="/dashboard-preview.jpg" 
                alt="AutoOps Dashboard Interface" 
                className="w-full h-full object-cover object-top" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="py-24 bg-zinc-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-blue-400" />}
              title="Identity Automation"
              desc="Onboard employees in seconds. AutoOps connects to HR tickets and creates Azure AD users instantly."
            />
            <FeatureCard 
              icon={<Server className="text-purple-400" />}
              title="Self-Healing Infra"
              desc="Detects frozen VMs and restarts them automatically via Azure Management API."
            />
            <FeatureCard 
              icon={<Zap className="text-yellow-400" />}
              title="Linux Maintenance"
              desc="Full disk? Crashed service? AutoOps SSHs in and runs the fix before you even get the alert."
            />
          </div>
        </div>
      </section>

      {/* 5. PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Simple, transparent pricing.</h2>
          
          <div className="p-1 rounded-2xl bg-gradient-to-b from-white/20 to-white/5 inline-block">
            <div className="bg-black rounded-xl p-8 md:p-12 border border-white/10 max-w-md mx-auto">
              <h3 className="text-xl text-gray-400 font-medium mb-4">Pro Plan</h3>
              <div className="text-5xl font-bold mb-6">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 text-left mb-8 text-gray-300">
                <li className="flex items-center"><CheckCircle2 className="text-green-500 mr-2 h-5 w-5" /> Unlimited Azure Alerts</li>
                <li className="flex items-center"><CheckCircle2 className="text-green-500 mr-2 h-5 w-5" /> Teams & Slack Broadcasting</li>
                <li className="flex items-center"><CheckCircle2 className="text-green-500 mr-2 h-5 w-5" /> Automated Remediation</li>
                <li className="flex items-center"><CheckCircle2 className="text-green-500 mr-2 h-5 w-5" /> 24/7 AI Analysis</li>
              </ul>

              {/* ACTION: PASTE YOUR STRIPE LINK HERE */}
              <a 
                href="https://buy.stripe.com/aFa5kDcVL5yodaQfIy5sA01" 
                target="_blank"
                className="block w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
              >
                Start 7-Day Free Trial
              </a>
              <p className="mt-4 text-xs text-gray-500">No credit card required for demo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-10 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2025 CMD FLEET (RRR CONNECT LLC). All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition">
      <div className="mb-4 bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
