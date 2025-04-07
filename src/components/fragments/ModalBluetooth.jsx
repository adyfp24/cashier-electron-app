import React, { useState } from 'react';

function ModalBluetooth({ isOpen, onClose }) {
    if (!isOpen) return null; 

    const bluetoothDevices = [
        { id: 1, name: 'Bluetooth Device 1' },
        { id: 2, name: 'Bluetooth Device 2' },
        { id: 3, name: 'Bluetooth Device 3' },
        { id: 4, name: 'Bluetooth Device 4' },
    ];

    const [selectedDevice, setSelectedDevice] = useState(null); 

    const handleSelectDevice = (device) => {
        setSelectedDevice(device);
    };

    const handleConnect = () => {
        if (selectedDevice) {
            console.log(`Connecting to ${selectedDevice.name}`);
        } else {
            console.log('Please select a device');
        }
    };

    const handleCancel = () => {
        setSelectedDevice(null); 
        onClose(); 
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="p-6 bg-white rounded-lg w-96">
                <h2 className="mb-4 text-xl font-semibold">Pilih Perangkat Bluetooth</h2>
                
                <div className="mb-4 space-y-2">
                    {bluetoothDevices.map((device) => (
                        <div
                            key={device.id}
                            onClick={() => handleSelectDevice(device)}
                            className={`cursor-pointer p-2 rounded-lg ${selectedDevice?.id === device.id ? 'bg-blue-200' : 'bg-gray-100'}`}
                        >
                            {device.name}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConnect}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Hubungkan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalBluetooth;
