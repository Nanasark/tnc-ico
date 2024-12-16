"use client";
import { useState } from "react";

interface TechsNetworkTokenCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export function TechsNetworkTokenCard({
  isVisible,
  onClose,
}: TechsNetworkTokenCardProps) {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy");
      }
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Techs Network Token (TNC)</h2>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-left">
                Token Information
              </h3>
              <div className="space-y-2 text-left">
                <p>
                  <span className="font-medium">Name:</span> Techs Network Token
                </p>
                <p>
                  <span className="font-medium">Symbol:</span> TNC
                </p>
                <div>
                  <p className="font-medium mb-1">Address:</p>
                  <div className="flex items-center space-x-2">
                    <code className="bg-blue-700 px-2 py-1 rounded text-sm break-all">
                      0x170b47f039d006396929F7734228fFc53Ab155b2
                    </code>
                    <button
                      className="p-1 hover:bg-blue-700 rounded flex-shrink-0"
                      onClick={() =>
                        copyToClipboard(
                          "0x170b47f039d006396929F7734228fFc53Ab155b2"
                        )
                      }
                      aria-label="Copy address"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {copySuccess && (
                <p className="text-sm text-green-300 mt-1">{copySuccess}</p>
              )}
            </div>
            <p className="text-sm text-left">
              This token is part of the Techs Network ecosystem. Always verify
              the token address before making any transactions.
            </p>
          </div>
        </div>
        <div className="p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
