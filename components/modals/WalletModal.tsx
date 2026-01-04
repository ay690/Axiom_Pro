
"use client";
import { Cog, Copy } from "lucide-react";
import { SolanaMark } from "@/components/marks/SolanaMark";

const WalletModal = () => {
    return (
        <div className="absolute top-12 right-0 bg-[#1C1C1E] border border-gray-700 rounded-lg p-4 w-80">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg">Wallets</h2>
                <Cog className="text-gray-400 w-5 h-5" />
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-md mr-3"></div>
                        <div>
                            <p className="text-white">Axiom Main</p>
                            <div className="flex items-center">
                                <p className="text-gray-400 text-sm">0x63c</p>
                                <Copy className="w-4 h-4 text-gray-400 ml-2" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <SolanaMark className="w-5 h-5 text-yellow-500" />
                            <span className="text-white ml-2">0</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <span className="text-white">0</span>
                    </div>
                </div>
            </div>
            <button className="flex items-center justify-center mt-4 text-white">
                <span className="text-2xl mr-2">+</span> Add Wallet
            </button>
        </div>
    );
};

export default WalletModal;
