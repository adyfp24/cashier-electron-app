import React, { useContext, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import Sidebar from '../components/layouts/Sidebar';
import ModalAppname from '../components/fragments/ModalAppname';
import ModalBluetooth from '../components/fragments/ModalBluetooth';
import ModalLogo from '../components/fragments/ModalLogo';
import { SettingContext } from '../context/settingContext';

function Setting() {
    const [isModalAppNameOpen, setIsModalAppNameOpen] = useState(false);
    const [isModalLogoOpen, setIsModalLogoOpen] = useState(false);
    const [isModalBluetoothOpen, setIsModalBluetoothOpen] = useState(false);
    const { settings, loading, error, getAllSetting, updateSettingName, updateSettingLogo } = useContext(SettingContext);

    const saveAppName = async (newData) => {
        console.log(newData);
        if (newData instanceof FormData) {
            for (let [key, value] of newData.entries()) {
                console.log(`Data diterima di saveAppName - ${key}: ${value}`);
            }
        }
        await updateSettingName(newData);
        setIsModalAppNameOpen(false);
    }

    const saveAppLogo = async (newData) => {
        console.log(newData);
        if (newData instanceof FormData) {
            for (let [key, value] of newData.entries()) {
                console.log(`Data diterima di saveAppName - ${key}: ${value}`);
            }
        }
        await updateSettingLogo(newData);
        setIsModalLogoOpen(false);
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <section className="h-screen p-3 pt-20 bg-gray-50 dark:bg-gray-900 sm:p-5 md:ml-64">
                <div className="max-w-screen-xl px-4 pt-10 mx-auto lg:px-12">
                    <h1 className="pt-6 mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                        Pengaturan Aplikasi
                    </h1>
                    <ul className="w-full space-y-4">
                        <li
                            onClick={() => setIsModalAppNameOpen(true)}
                            className="w-full px-4 py-2 text-base font-medium text-gray-600 border-2 rounded-md cursor-pointer hover:underline dark:text-blue-400"
                        >
                            Nama Aplikasi
                        </li>
                        <li
                            onClick={() => setIsModalLogoOpen(true)}
                            className="w-full px-4 py-2 text-base font-medium text-gray-600 border-2 rounded-md cursor-pointer hover:underline dark:text-blue-400"
                        >
                            Logo Aplikasi
                        </li>
                        <li
                            onClick={() => setIsModalBluetoothOpen(true)}
                            className="w-full px-4 py-2 text-base font-medium text-gray-600 border-2 rounded-md cursor-pointer hover:underline dark:text-blue-400"
                        >
                            Bluetooth Printer
                        </li>
                    </ul>
                </div>
            </section>

            {/* Modal Components */}
            <ModalAppname
                isOpen={isModalAppNameOpen}
                onClose={() => setIsModalAppNameOpen(false)}
                onSubmit={saveAppName}
            />
            <ModalLogo
                isOpen={isModalLogoOpen}
                onClose={() => setIsModalLogoOpen(false)}
                onSubmit={saveAppLogo}
            />
            <ModalBluetooth
                isOpen={isModalBluetoothOpen}
                onClose={() => setIsModalBluetoothOpen(false)}
            />
        </>
    );
}

export default Setting;
