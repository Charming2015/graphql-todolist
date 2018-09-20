new Vue({
  el: '#app',
  data: function() {
    return {
      editid: 0,
      list: [
        {
          title: 'homework',
          desc: 'do homework',
          date: '2018-09-07 09:34:02',
          id: '123132',
          checked: false
        },
        {
          title: 'eating',
          desc: 'lunch',
          date: '2018-08-03 10:26:02',
          id: '1111',
          checked: true
        }
      ],
      showDialog: false,
      isEdit: false,
      params: {
        date: '',
        desc: '',
        title: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
  methods: {
    getTime(time){
      var oDate = new Date(time);
      var vYear = oDate.getFullYear();
      var vMon = oDate.getMonth() + 1;
      var vDay = oDate.getDate();
      vMon = vMon<10 ? '0'+vMon :vMon;
      vDay = vDay<10 ? '0'+vDay :vDay;
      var today = vYear +　'-' + vMon + '-' + vDay;

      var hour = oDate.getHours();
      var min = oDate.getMinutes();
      var sec = oDate.getSeconds();
      hour = hour<10 ? '0'+hour :hour;
      min = min<10 ? '0'+min :min;
      sec = sec<10 ? '0'+sec :sec;

      var str = hour + ':' + min + ':' + sec;
      return today+' '+str;
    },
    getUid() {
      function S4() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },
    openAddDialog() {
      this.showDialog = true;
      this.isEdit = false;
      this.params.title = "";
      this.params.desc = "";
      this.params.date = "";
    },
    openEditDialog(id) {
      this.isEdit = true
      this.editid = id
      let target = this.list.filter(o => o.id === id)[0];
      this.params.desc = target.desc
      this.params.title = target.title
      this.params.date = new Date(target.date)
      this.showDialog = true
    },
    confirm() {
      if (this.isEdit) {
        this.editOne()
      } else {
        this.addOne()
      }
    },
    addOne() {
      this.list.unshift({
        id: this.getUid(),
        desc: this.params.desc,
        title: this.params.title,
        date: this.getTime(this.params.date),
        checked: false,
      })
      this.showDialog = false
    },
    delOne(id) {
      let that = this
      this.$confirm('确定删除？')
      .then(_ => {
        this.list = this.list.filter(o => o.id !== id);
      })
      .catch(_ => {});
    },
    editOne() {
      this.list = this.list.map(o => {
        if (o.id === this.editid) {
          o.desc = this.params.desc
          o.title = this.params.title
          o.date = this.getTime(this.params.date)
          console.log(this.getTime(this.params.date))
        }
        return o
      })
      this.showDialog = false
    },
    tickOne(checked, id) {
      this.list = this.list.map(o => {
        if (o.id === id) {
          o.checked = checked
        }
        return o
      })
      console.log(this.list)
    }
  },
  computed: {
    disable() {
      return this.params.desc === '' || this.params.title === '' || this.params.date === ''
    }
  }
})