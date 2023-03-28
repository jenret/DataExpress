const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');



const url = "http://localhost:3000/api/getQuestion1";
const url2 = "http://localhost:3000/api/getQuestion2";
const url3 = "http://localhost:3000/api/getQuestion3";

fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        SetupChart(ctx, data.labels, data.data);
    });

fetch(url2)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        SetupChart(ctx2, data.labels, data.data);
    });

fetch(url3)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        SetupChart(ctx3, data.labels, data.data);
    });



function SetupChart(ctx, labels, data) {
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
        labels: labels,
        datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
        }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
        },
        hoverOffset: 4
    });
}

