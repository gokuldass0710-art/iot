import React, { useState } from 'react';
import { 
  Lock, 
  Key, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  RotateCcw, 
  FileCheck,
  Cpu,
  ArrowRight,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export default function FirmwareLab() {
  const defaultFirmware = "v1.0.4-RELEASE-BUILD_BUILD_HASH_9A8F31_SMART_LOCK_FIRMWARE_CORE";
  const [binaryContent, setBinaryContent] = useState(defaultFirmware);
  const [signature, setSignature] = useState("RSA3072_SIG_7F8A9B2C4D5E6F1A2B3C4D5E6F7A8B9C_OK");
  const [verificationResult, setVerificationResult] = useState(null);
  const [bootState, setBootState] = useState('idle'); // 'idle', 'verifying', 'success', 'rejected'

  const computeSignature = () => {
    // Simulated SHA256 digest signing
    let hash = 0;
    for (let i = 0; i < binaryContent.length; i++) {
      hash = (hash << 5) - hash + binaryContent.charCodeAt(i);
      hash |= 0;
    }
    const computedSig = `RSA3072_SIG_${Math.abs(hash).toString(16).toUpperCase()}_SIGNED_BY_OFFICIAL_CA`;
    setSignature(computedSig);
    setVerificationResult(null);
    setBootState('idle');
  };

  const verifyFirmware = () => {
    setBootState('verifying');
    setTimeout(() => {
      // Check if signature matches current content
      let hash = 0;
      for (let i = 0; i < binaryContent.length; i++) {
        hash = (hash << 5) - hash + binaryContent.charCodeAt(i);
        hash |= 0;
      }
      const expectedSig = `RSA3072_SIG_${Math.abs(hash).toString(16).toUpperCase()}_SIGNED_BY_OFFICIAL_CA`;

      if (signature === expectedSig) {
        setVerificationResult({ valid: true, message: 'VERIFICATION SUCCESSFUL: RSA-3072 digital signature matches firmware digest.' });
        setBootState('success');
      } else {
        setVerificationResult({ valid: false, message: 'VERIFICATION FAILED: Firmware binary digest mismatch! Unauthorized tampering detected!' });
        setBootState('rejected');
      }
    }, 600);
  };

  const tamperFirmware = () => {
    setBinaryContent(prev => prev + "_MALICIOUS_BACKDOOR_INJECTED_X09");
    setVerificationResult(null);
    setBootState('idle');
  };

  const resetFirmware = () => {
    setBinaryContent(defaultFirmware);
    computeSignature();
  };

  return (
    <div className="space-y-6">
      {/* Sandbox Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>Firmware Integrity & RSA-3072 Secure Boot Sandbox</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrate cryptographic signature verification and tamper detection before execution
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={resetFirmware}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Binary & Signature Editor */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="font-heading font-bold text-white text-base flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-purple-400" />
            <span>Firmware Binary Image & Keys</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">
              FIRMWARE BINARY CONTENT (firmware_v1.bin)
            </label>
            <textarea
              value={binaryContent}
              onChange={(e) => {
                setBinaryContent(e.target.value);
                setVerificationResult(null);
                setBootState('idle');
              }}
              rows={4}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={computeSignature}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Sign with Private Key</span>
            </button>

            <button
              onClick={tamperFirmware}
              className="flex-1 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 hover:bg-rose-500/20 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Inject Tamper Byte</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">
              GENERATED RSA-3072 SIGNATURE (firmware.sig)
            </label>
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl text-xs font-mono text-purple-300 break-all">
              {signature}
            </div>
          </div>

          <button
            onClick={verifyFirmware}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 fill-slate-950" />
            <span>Verify Signature & Boot Sequence</span>
          </button>
        </div>

        {/* Secure Boot Workflow Diagram & Results */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="font-heading font-bold text-white text-base flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Secure Boot Sequence Execution</span>
          </h3>

          {/* Verification Result Banner */}
          {verificationResult && (
            <div className={`p-4 rounded-xl border font-mono text-xs ${
              verificationResult.valid 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 glow-emerald' 
                : 'bg-rose-500/10 border-rose-500/40 text-rose-300 glow-rose animate-bounce'
            }`}>
              <div className="flex items-center space-x-2 font-bold text-sm mb-1">
                {verificationResult.valid ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                <span>{verificationResult.valid ? 'SIGNATURE VALID' : 'TAMPERING DETECTED'}</span>
              </div>
              <p>{verificationResult.message}</p>
            </div>
          )}

          {/* Secure Boot Control Flow */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">1. Power On & Bootloader Initialization</span>
              <span className="text-emerald-400">PASSED</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              bootState === 'verifying' ? 'bg-cyan-500/10 border-cyan-500 animate-pulse text-cyan-300' :
              bootState === 'success' ? 'bg-slate-900 border-emerald-500/40 text-emerald-300' :
              bootState === 'rejected' ? 'bg-slate-900 border-rose-500/40 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <span>2. Read RSA Public Key & Compute SHA256</span>
              <span className="font-bold">
                {bootState === 'verifying' ? 'COMPUTING...' : bootState === 'success' ? 'VERIFIED' : bootState === 'rejected' ? 'FAILED' : 'WAITING'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              bootState === 'success' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold' :
              bootState === 'rejected' ? 'bg-rose-500/15 border-rose-500 text-rose-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <span>3. Boot Decision</span>
              <span>
                {bootState === 'success' ? 'BOOT AUTHORIZED ✅' : bootState === 'rejected' ? 'EXECUTION REJECTED ❌' : 'PENDING'}
              </span>
            </div>
          </div>

          {/* Command reference */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-900">
            <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase">OpenSSL CLI Equivalent Commands</span>
            <pre className="text-[11px] font-mono text-cyan-400 leading-relaxed overflow-x-auto">
{`# 1. Generate RSA-3072 Key Pair
openssl genrsa -out firmware_private.key 3072
openssl rsa -in firmware_private.key -pubout -out firmware_public.key

# 2. Sign Firmware Binary
openssl dgst -sha256 -sign firmware_private.key -out firmware.sig firmware_v1.bin

# 3. Verify Signature
openssl dgst -sha256 -verify firmware_public.key -signature firmware.sig firmware_v1.bin`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
