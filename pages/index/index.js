//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    input:'',
    tasks:[],
    logs:[],
    leftCount:0,
    toggle:'Complete'
  },
  save:function(){
    wx.setStorageSync('todo_list', this.data.tasks)
    wx.setStorageSync('todo_logs', this.data.logs)
  },
  onLoad: function () {
    var tasks=wx.getStorageSync('todo_list')
    var logs=wx.getStorageSync('todo_logs')
    if(tasks){
      var leftCount=tasks.filter((task)=>{
        return !task.completed
      }).length
      this.setData({
        tasks:tasks,
        leftCount:leftCount
      })
    }
    if(logs){
      this.setData({
        logs:logs
      })
    }
  },
  inputChangeHandle:function (e){
    this.setData({input:e.detail.value})
  },
  addTodoHandle:function(e){
    if(!this.data.input.trim()){
      wx.showToast({
        title: '请输入有效内容',
        duration:1000
      })
      return
    }
    var tasks=this.data.tasks
    var logs=this.data.logs
    console.log(this.data.logs)
    tasks.push({completed:false,content:this.data.input})
    logs.push({timestamp:new Date(),action:'新增',name:this.data.input})
    this.setData({
      input:'',
      tasks:tasks,
      logs:logs,
      leftCount:this.data.leftCount+1
    })
    this.save()
  },
  toggleTodoHandle:function(e){
    var index = e.currentTarget.dataset.index
    var tasks=this.data.tasks
    tasks[index].completed = !tasks[index].completed
    var logs=this.data.logs
    logs.push({
      timestamp:new Date(),
      action:tasks[index].completed?'标记完成':'标记未完成',
      name:tasks[index].content
    })
    this.setData({
      tasks:tasks,
      logs:logs,
      leftCount:this.data.leftCount+(tasks[index].completed?-1:1)
    })
    this.save()
  },
  removeTodoHandle:function(e){
    var index=e.currentTarget.dataset.index
    var tasks=this.data.tasks
    var logs=this.data.logs
    var remove=tasks.splice(index,1)
    logs.push({
      timestamp:new Date(),
      action:'删除任务',
      name:remove.content  
    })
    this.setData({
      tasks:tasks,
      logs:logs,
      leftCount:this.data.leftCount
    })
  },
  toggleAllTodoHandle:function(e){
    var tasks=this.data.tasks
    var logs=this.data.logs
    var leftCount=this.data.leftConut
    console.log(this.data)
    if(this.data.toggle=='Complete'){
      tasks.forEach((task) =>{
        task.completed=true
      })
      logs.push({timestamp:new Date(),action:'标记完成',name:'All Tasks'})
      leftCount=0
    }else{
      tasks.forEach((task) => {
        task.completed = false
      })
      logs.push({ timestamp: new Date(), action: '标记未完成', name: 'All Tasks' })
      leftCount=tasks.length
    }
    this.setData({
      tasks:tasks,
      logs:logs,
      leftCount:leftCount,
      toggle:this.data.toggle=='Complete'?'Active':'Complete'
    })
    this.save()   
  },
  clearAllTodoHandle:function(e){
    var logs=this.data.logs
    logs.push({
      timestamp: new Date(),
      action: '清除',
      name: 'All Tasks'
    })
    this.setData({
      tasks:[],
      logs:logs,
      leftCount:0,
      toggle:'Complete'
    })
    this.save()
  }
})
