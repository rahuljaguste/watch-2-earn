import React , {useEffect} from 'react';
import { useRouter } from 'next/router';
import watch2EarnFactoryContract from "contracts/Watch2EarnFactory.json";
import { useMoralis } from "react-moralis";

const Modal = () => {
    const router = useRouter();
    const {  abi } = watch2EarnFactoryContract;
    const { isWeb3Enabled, Moralis, account, chainId, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();

      const createTransaction = async () => {
        if (isAuthenticated && isWeb3Enabled) {
            const currentUser = user.attributes.ethAddress;
            console.log(currentUser);
            const transaction = await Moralis.executeFunction({
                contractAddress: "0xfA23cAE49d03dBc8Dc700Afb7598018F7871E53E",
                functionName: "mint",
                abi: abi,
                params: {
                    contractAddress:"0xF0859E4eaBAA5a587F38f2536A635ff618c0046e",
                    account: currentUser,
                    id: 1,
                    amount: 1,
                    data: [],
                    _tokenURI: "QmV9iYeXh6sRukUnP3Ev952JfYgDAjSMqsuErk2VNyGAw8"
                },
            });
            const receipt = await transaction.wait(1);
            console.log(receipt);
        }else{
            console.log("Not Authenticated");
        }
      }

    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover bg-dark backdrop-filter backdrop-blur-md bg-opacity-20" >
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">

                <div className="">
                    <div className="text-center p-5 flex-auto justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-xl py-4 mt-4 text-black">Accept the voucher to continue</h2>
                    </div>
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <button onClick={() => router.push('/')} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            Cancel
                        </button>
                        <button onClick={createTransaction} className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:opacity-80">Accept</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Modal;
