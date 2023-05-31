// Bluetooth functionality

    // Request Bluetooth device
    async function requestBluetoothDevice() {
        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{
              services: ['The uuid of this device']
            }]
          });
          return device;
        } catch (error) {
          console.error('Error requesting Bluetooth device:', error);
        }
      }
  
      // Connect to Bluetooth device
      async function connectBluetoothDevice(device) {
        try {
          const server = await device.gatt.connect();
          const service = await server.getPrimaryService('The uuid of this device');
          const characteristic = await service.getCharacteristic('your_characteristic_uuid');
          characteristic.addEventListener('characteristicvaluechanged', handleTemperatureChange);
          await characteristic.startNotifications();
        } catch (error) {
          console.error('Error connecting to Bluetooth device:', error);
          showDefaultGraph();
        }
      }
  
      // Handle temperature change event
      function handleTemperatureChange(event) {
        const temperatureValue = event.target.value.getFloat32(0, true);
        // Process temperature value, update chart, etc.
      }
  
      // Default graph
  
      // Default temperature data
      const defaultTemperatureData = [25, 26, 24, 23, 22, 21, 20];
  
      // Show default graph
      function showDefaultGraph() {
        temperatureChart.data.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        temperatureChart.data.datasets[0].data = defaultTemperatureData;
        temperatureChart.update();
      }
  
      // Temperature chart
  
      // Initialize chart
      const ctx = document.getElementById('temperatureChart').getContext('2d');
      const temperatureData = []; // Array to store temperature values
  
      const temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Temperature',
            data: temperatureData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointHoverBorderColor: '#fff'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
  
      // Start Bluetooth functionality
      async function startBluetoothFunctionality() {
        try {
          const device = await requestBluetoothDevice();
          await connectBluetoothDevice(device);
        } catch (error) {
          console.error('Error starting Bluetooth functionality:', error);
          showDefaultGraph();
        }
      }
  
      // Start Bluetooth functionality when the page loads
      document.addEventListener('DOMContentLoaded', startBluetoothFunctionality);