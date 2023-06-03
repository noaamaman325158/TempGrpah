const ctx = document.getElementById('temperatureChart').getContext('2d');
    const temperatureData = []; // Empty array to store temperature data

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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: '#777'
            },
            gridLines: {
              color: '#ddd'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#777'
            },
            gridLines: {
              color: '#ddd'
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      }
    });

    function updateStatistics() {
      const avgTemperature = calculateAverage(temperatureData);
      const maxTemperature = Math.max(...temperatureData);
      const minTemperature = Math.min(...temperatureData);

      document.getElementById('avgTemperature').textContent = avgTemperature.toFixed(2);
      document.getElementById('maxTemperature').textContent = maxTemperature.toFixed(2);
      document.getElementById('minTemperature').textContent = minTemperature.toFixed(2);
    }

    function calculateAverage(data) {
      if (data.length === 0) {
        return 0;
      }

      const sum = data.reduce((acc, curr) => acc + curr, 0);
      return sum / data.length;
    }

    function simulateDataUpdate() {
      const temperatureValue = Math.random() * 10 + 20; // Generate a random temperature between 20 and 30
      temperatureData.push(temperatureValue);
      temperatureChart.data.labels.push(new Date().toLocaleTimeString());

      if (temperatureData.length > 10) {
        temperatureData.shift(); // Remove the oldest data point if the array exceeds 10 elements
        temperatureChart.data.labels.shift();
      }

      if (temperatureValue <= 22) {
        temperatureChart.data.datasets[0].pointBackgroundColor = 'rgba(255, 0, 0, 1)';
        temperatureChart.data.datasets[0].pointHoverBackgroundColor = 'rgba(255, 0, 0, 1)';
      } else if (temperatureValue >= 28) {
        temperatureChart.data.datasets[0].pointBackgroundColor = 'rgba(255, 165, 0, 1)';
        temperatureChart.data.datasets[0].pointHoverBackgroundColor = 'rgba(255, 165, 0, 1)';
      } else {
        temperatureChart.data.datasets[0].pointBackgroundColor = 'rgba(75, 192, 192, 1)';
        temperatureChart.data.datasets[0].pointHoverBackgroundColor = 'rgba(75, 192, 192, 1)';
      }

      temperatureChart.update();
      updateStatistics();

      if (temperatureValue > 25) {
        displayAlert('High Temperature Alert!', 'The temperature has exceeded 25 degrees.', 'warning');
      }
    }

    function displayAlert(title, text, type) {
      const alertContainer = document.getElementById('alertContainer');
      const alert = document.createElement('div');
      alert.className = `alert alert-${type}`;
      alert.textContent = title + ' ' + text;
      alertContainer.appendChild(alert);
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }

    setInterval(simulateDataUpdate, 2000);
