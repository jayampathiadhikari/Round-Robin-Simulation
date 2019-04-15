time_quantum = 2

time = 0
done = False

class process:
    
    x=1
    def __init__(self,burst_time,arrival_time):
        self.iD = process.x
        self.arrival_time = arrival_time
        self.burst_time= burst_time
        self.remaining_time = burst_time
        process.x +=1
    def execute_once(self):
        if(self.remaining_time > time_quantum):
            self.remaining_time -= time_quantum
        else:
            self.remaining_time = 0
        #print("executing "+ str(self.iD))


processList =[]
readyQueue =[]
indexArray = []
p1 = process(3,0)
p2 = process(4,0)
p3 = process(4,3)
p4 = process(5,0)


processList.append(p1)
processList.append(p2)
processList.append(p3)
processList.append(p4)

def addToReadyQueue():
    i = 0
    while(i<len(processList)):
        if(processList[i].arrival_time == time):
            readyQueue.append(processList[i])
            processList.pop(i)
        else:
            i+=1
        
    #print(indexArray)
    #for i in indexArray:
        #processList2 = processList
        #x = processList2.pop(i)
        #readyQueue.append(x)

def execute():
    global time
    while(len(processList)!=0 and len(readyQueue) != 0):
        pro = readyQueue.pop(0)
        count = 0
        while(count< time_quantum and pro.remaining_time>0):
            pro.execute_once()
            count+=1
            time+=1
            addToReadyQueue()
            print("id"+str(pro.iD))
            print("count "+str(count))
            print("time "+str(time))
        if(pro.remaining_time>0):
            readyQueue.append(pro)
            print("hello")
        print(readyQueue)
        

addToReadyQueue()

execute()

    
    
    
