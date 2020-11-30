const approvalChartCanvas = document.getElementById("approvalChart");
const appctx = approvalChartCanvas.getContext("2d"); //appctx -> APPROVAL CONTEXT!!!

const approvalChart = new Chart(appctx, {
    type: "line",
    backgroundColor: "rgba(220, 220, 220, 1)",
    data: {
        labels: [1, 2, 3, 4],
        datasets: [{
            label: "Approval Ratings",
            data: [
                {x: 1   , y: 0},
                {x: 2, y: 20},
                {x: 3, y: 30},
                {x: 4, y: 40},
            ],
            fill: false,
            backgroundColor: "#90c587",
            borderColor: "#90c587", 
            borderWidth: 5,
            pointRadius: 5,
            pointBackgroundColor: "#ffffff"
        }]
    },
    options: {
        legend: {
            labels: {
                fontFamily: "Rubik"
            }
        }
    }
});
