export { Duty, Dean, Department, currentDate, Meeting, DeanUnregistered }

class Department {
  constructor (name: string, id: string) {
    this.name = name
    this.id = id

    Object.freeze(this)
  }

  name: string
  id: string
}

class Dean {
  constructor (id: string, name: string, surname: string, email: string, status: string, duties: Array<Duty>) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.duties = duties
    this.status = status

    Object.freeze(this)
  }

  id: string;
  name: string;
  surname: string;
  email: string;
  duties: Array<Duty>
  status: string;
}

class Duty {
  constructor (dayOfWeek: number, begins: string, ends: string) {
    this.dayOfWeek = dayOfWeek
    this.begins = begins
    this.ends = ends

    Object.freeze(this)
  }

  dayOfWeek: number;
  begins: string;
  ends: string;
}

class currentDate {
  constructor () {
    this.date = new Date()

    Object.freeze(this)
  }

  date: Date
}

class Meeting {
  id: string
  email: string
  name: string
  surname: string
  goal: string
  date: string
  pickedTimeWindow: Date
  deanId: string
  isOnline: Boolean
  isAccepted: Boolean

  constructor (id: string, name: string, surname: string, email: string, goal: string, pickedTimeWindow: Date, deanId: string, isOnline: Boolean, isAccepted: Boolean = false) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.goal = goal
    this.pickedTimeWindow = pickedTimeWindow
    this.date = this.pickedTimeWindow.getDay().toString() + '.' + this.pickedTimeWindow.getMonth().toString() + '.' + this.pickedTimeWindow.getFullYear().toString()
    this.deanId = deanId
    this.isOnline = isOnline
    this.isAccepted = isAccepted

    Object.freeze(this)
  }
}

class DeanUnregistered {
  constructor (name: string, surname: string, email: string, password: string, passwordCheck: string, department: Department) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.passwordCheck = passwordCheck
    this.department = department

    Object.freeze(this)
  }

  department: Department
  name: string;
  surname: string;
  email: string;
  password: string
  passwordCheck: string
}
