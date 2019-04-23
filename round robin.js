var id = 0;
var time_quantum ;
var time = 0;
var done = false;
var elemntid = 2;
var endTime = 27;
var turn_time =0;
var no_process =0;

class process {
    constructor(burst_time, arrival_time) {
        this.id = id + 1;
        this.arrival_time = arrival_time;
        this.burst_time = burst_time;
        this.remaining_time = burst_time;
        this.colour = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        id += 1;
    }
    get Id() {
        return this.id;
    }
    get remainingTime() {
        return this.remaining_time;
    }
    get burstTime() {
        return this.burst_time;
    }
    get arrivalTime() {
        return this.arrival_time;
    }
    execute_once() {
        this.remaining_time -= 1;
    }
}

async function execute(){
    
    while(!(processList.length==0 && readyQueue.length==0)){
        //sleep for 1s
        if(readyQueue.length!=0){
            pro = readyQueue.shift();
            count=0;
            while(count<time_quantum && pro.remainingTime>0){
                await sleep(1500);
                pro.execute_once();
                $("div.jqTimespaceColumn:nth-child("+(time+1)+")").css("background",pro.colour).append("<p>Process "+pro.Id+"</p>");
                $("#process_details").html("Executing Process "+pro.Id+" ");
                // console.log("time "+ time);
                // console.log(pro.Id);
                //moving the gnatt chart
                if(time>=9 && (time-9)%4==0){
                    $("div[title|='Move Right']").trigger("click");
                }
                count++;
                time++;
                addToReadyQueue();//checks for new arrivals
            }
            if(pro.remainingTime!=0){
                //if the process is not completed append to readyQueue
                readyQueue.push(pro);
            }
            else{
                //if process is completed 
                turn_time += (time-pro.arrivalTime);
            }
        }
        else{
            // console.log("time "+time);
            // console.log("waiting for process");
            await sleep(1500);
            $("div.jqTimespaceColumn:nth-child("+(time+1)+")").append("<p>waiting</p>");
            $("#process_details").html("Waiting for process");
            if(time>=9 && (time-9)%4==0){
                    
                $("div[title|='Move Right']").trigger("click");
            }
            time++;
            addToReadyQueue();
        }
    }
    $("#process_details").html("Average Turn Around Time : " + turn_time/no_process);
    
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function addToReadyQueue(){
    var i=0;
    while(i< processList.length){
        if(processList[i].arrivalTime==time){
            readyQueue.push(processList[i]);
            processList.splice(i,1);
        }
        else{
            i++;   
        }
    }
}

function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

// process1 = new process(3, 0);
// process2 = new process(4, 0);
// process3 = new process(4, 15);
// process4 = new process(5, 0);

var processList = new Array();
var readyQueue = new Array();
//initiatte process list
// processList.push(process1);
// processList.push(process2);
// processList.push(process3);
// processList.push(process4);
//initiating readyQueue.

function createEle(){
    var t = $('<tr id="trow'+elemntid+'"><th scope="row">'+ elemntid +'</th><td><input class="form-control" type="number" min=0 id="burst'+elemntid+'" /></td><td><input class="form-control" type="number" min=0 id="arrival'+elemntid+'" /></td></tr>');    
    return t;
}

$(document).ready(function(){
    time_quantum =parseInt($("#time_quantum").val()) ;
    
    $('#buttonAdd').click(function() {
        $("#tbody").append(createEle());
        elemntid++;        
    });
    $("#buttonRem").click(function(){
        if(elemntid>1){
            elemntid-=1;}
        $('#trow'+elemntid).remove();    
    });
    $("#buttonSub").click(function(){
        //onlick of submit button
        if($('#timeline').has()){
            $('#timeline').empty();
            id=0;
            time=0;
            processList =[];
            readyQueue =[];
            done = false;
            turn_time =0;
            no_process =0;
        }
        
        $('#timeline').timespace({

            // 24-hour timeline
            data: {
              
                events: [
                    {
                        start: 6.50, 
                        title: '', 
                        description: 'Eat a healthy breakfast.',
                        
                      },
                      {start: 8, end: 10, title: 'Walk', description: 'Go for a walk.'},
                      {start: 14, title: 'Lunch', description: 'Eat a healthy lunch.'},
                      {start: 14.75, title: 'Meeting', description: 'Meeting with Co-workers.'},
                ]
              },
          
          });


          var c = $("#tbody").children().length;
          for (i = 1; i <= c; i++) {
                var burst=parseInt($("#burst"+i.toString()).val()) ;
                var arr = parseInt($("#arrival"+i.toString()).val()) ;
                processList.push(new process(burst, arr));
          }
          no_process= processList.length;
          addToReadyQueue();
          execute();    
    });

    $("#forwardBtn").click(function(){
        $("div.jqTimespaceColumn:nth-child("+3+")").css("background", "coral").append("<p>Test</p>");    
    });
    
});

function unhideFunction() {
    var divelement = document.getElementsByName("hiddenEl");
    divelement.forEach(element => {
        if (element.style.display == 'none')
        element.style.display = 'block';
    });
    
};



  
  




