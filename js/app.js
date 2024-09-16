const app = Vue.createApp({

    data() {
        return {
            rooms: [],
            reserved: [],
            search: '',
            userStartDate: new Date().toISOString(),
            userEndDate: new Date().toISOString(),
            openModal: false,
            reservingImage: '',
            reservingId: null,
            reservingName: '',
            reservingAddress: '',
            reservingPrice: null,
            reservingCapacity: null,
            reservingStartDate: new Date().toISOString(),
            reservingEndDate: new Date().toISOString()
        }
    },

    mounted() {
        fetch('../json/rooms.json')
        .then(res => res.json())
        .then(data => this.rooms = data)

        fetch('../json/reserved.json')
        .then(res => res.json())
        .then(data => this.reserved = data)
    },

    methods: {
        start(){
            console.log(this.userStartDate)
        },
        end(){
            console.log(this.userEndDate)
            // for(r in this.reserved){
                    
            //     let tape = (this.reserved[r].roomStartDate <= this.userStartDate && this.userStartDate < this.reserved[r].roomStartDate && this.reserved[r].roomStartDate < this.userEndDate && this.userEndDate < this.reserved[r].roomEndDate) || (this.userStartDate <= this.reserved[r].roomStartDate && this.reserved[r].roomStartDate < this.userEndDate && this.userStartDate < this.reserved[r].roomEndDate && this.reserved[r].roomEndDate < this.userEndDate)

            //     let first = (this.reserved[r].roomStartDate <= this.userStartDate)
            //     let secont = (this.userStartDate < this.reserved[r].roomStartDate)
            //     let three = (this.reserved[r].roomStartDate < this.userEndDate)
            //     let four = (this.userEndDate < this.reserved[r].roomEndDate)
            //     let five = (this.userStartDate <= this.reserved[r].roomStartDate)
            //     let six = (this.reserved[r].roomStartDate < this.userEndDate)
            //     let seven = (this.userStartDate < this.reserved[r].roomEndDate)
            //     let eight = (this.reserved[r].roomEndDate < this.userEndDate)

            //     let myFirst = (this.userStartDate < this.reserved[r].roomStartDate)
            //     let mySecond = (this.userEndDate <= this.reserved[r].roomStartDate)
            //     let myThree = (this.reserved[r].roomEndDate <= this.userStartDate)
            //     let myFour = (this.reserved[r].roomEndDate < this.userEndDate)

            //     let myTape = ((this.userStartDate < this.reserved[r].roomStartDate && this.userEndDate <= this.reserved[r].roomStartDate) || (this.reserved[r].roomEndDate <= this.userStartDate && this.reserved[r].roomEndDate < this.userEndDate))

            //     console.log("tape\n"+tape)

            //     console.log("first\n"+first)
            //     console.log("secont\n"+secont)
            //     console.log("three\n"+three)
            //     console.log("four\n"+four)
            //     console.log("five\n"+five)
            //     console.log("six\n"+six)
            //     console.log("seven\n"+seven)
            //     console.log("eight\n"+eight)

            //     console.log("myFirst\n"+myFirst)
            //     console.log("mySecond\n"+mySecond)
            //     console.log("myThree\n"+myThree)
            //     console.log("myFour\n"+myFour)

            //     console.log("myTape\n"+myTape)
            // }
        },
        reserve(e){
            this.openModal = true
            this.reservingImage = this.rooms[e-1].image
            this.reservingId = this.rooms[e-1].id
            this.reservingName = this.rooms[e-1].name
            this.reservingAddress = this.rooms[e-1].address
            this.reservingCapacity = this.rooms[e-1].maxcapacity
            this.reservingPrice = this.rooms[e-1].price
            this.reservingStartDate = this.userStartDate.slice(0, 10)
            this.reservingEndDate = this.userEndDate.slice(0, 10)
        },
        closeReserve(){
            this.openModal = false
        }
    },

    computed: {
        findroom(){
            return this.rooms.filter((room) => {
                if (room.name.toLowerCase().includes(this.search.toLowerCase())){
                    return room
                }
            })
        },
        roomDate(){
            return this.rooms.filter((room) => {
                if (room.name.toLowerCase().includes(this.search.toLowerCase())){
                    for(r in this.reserved){
                        if (this.reserved[r].roomId === room.id){
                            if((this.userStartDate < this.reserved[r].roomStartDate && this.userEndDate <= this.reserved[r].roomStartDate) || (this.reserved[r].roomEndDate <= this.userStartDate && this.reserved[r].roomEndDate < this.userEndDate)){
                                return room
                            }
                        }
                    }
                }
            })
        }
    }
})

app.mount('#app')
