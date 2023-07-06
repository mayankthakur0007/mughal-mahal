export const Users = [
    {
    _id:1,
    name:"Abdul Rizwan Kaji",
    createdAt:new Date(),
    updatedAt:new Date(),
    phoneNumber:9879382739,
    email:"rizwan@gmail.com",
    status:"Active",
    serialNumber:"@123#1",
    dateOfJoining:new Date(),
    branchId:10,
    designationId:20,
    civilId:282010406061,
    civilIdExpiry:new Date(),
    medicalExpiry:new Date(),
    roles:["staff"],
},
    {
    _id:2,
    name:"Azeem Ahmad Khan",
    createdAt:new Date(),
    updatedAt:new Date(),
    phoneNumber:896389129,
    email:"azeemkhan@gmail.com",
    status:"Block",
    serialNumber:"@1221#1",
    dateOfJoining:new Date(),
    branchId:11,
    designationId:21,
    civilId:282010402160,
    civilIdExpiry:new Date(),
    medicalExpiry:new Date(),
    roles:["admin"],
}
]

export const Branches = [
    {
        _id:10,
        name:"Elite (SLMY#1)",
        contactEmail:"fahaheel@mughalmahal.com",
        contactPhoneNumebr:9897182621,
        code:"FAHL",
        createdAt:new Date(),
        updatedAt: new Date(),
    },
    {
        _id:11,
        name:"Farwaniya",
        contactEmail:"farwaniya@mughalmahal.com",
        contactPhoneNumebr:9897182621,
        code:"FRWN",
        createdAt:new Date(),
        updatedAt: new Date(),
    }
]

export const Designations = [
    {
        _id:20,
        name:"Chainease Cook",
        createdAt:new Date(),
        updatedAt:new Date(),
    },
    {
        _id:21,
        name:"Waiter",
        createdAt:new Date(),
        updatedAt:new Date(),
    }
]

export const Leaves = [
    {
        _id: 30,
        kuwaitPhoneNumber: "8789237283",
        alternativePhoneNumber: "91628712981",
        type: "Emergency",
        status: "Approved",
        startDate: new Date(),
        endDate: new Date(),
        lastVacationDate: new Date(),
        totalDaysAvailed: 10,
        appliedBy: 1, // id of the user who is applying
        isYourLastVacationDelayed: true,
        isFirstVacation: true,
        isMoneyOwned: true,
        dateOfMoneyOwned: new Date(),
        totalMoneyOwned: "1000",
        flightPreference: "Indigo",
        mentionDestinationTicked: "",
        isReadyToPayTicketsVariables: "Yes",
        approvedByManager: true,
        approvedByManagerId:2, // id of the user who is approving
        approvedByManagerOn: new Date(),
        approvedByHR: true,
        approvedByHRId: 2, // id of the user who is approving
        approvedByHROn: new Date(),
        emergencyDocId: 2323,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        _id: 31,
        kuwaitPhoneNumber: "9983729837",
        alternativePhoneNumber: "9732983732",
        type: "Regular Due Vacation",
        status: "Pending",
        startDate: new Date(),
        endDate: new Date(),
        lastVacationDate: new Date(),
        totalDaysAvailed: 0,
        appliedBy: 2, // id of the user who is applying
        isYourLastVacationDelayed: false,
        isFirstVacation: false,
        isMoneyOwned: false,
        dateOfMoneyOwned: new Date(),
        totalMoneyOwned: 0,
        flightPreference: "Indigo",
        mentionDestinationTicked: "",
        isReadyToPayTicketsVariables: "Yes",
        approvedByManager: false,
        approvedByManagerId:0, // id of the user who is approving
        approvedByManagerOn: new Date(),
        approvedByHR: false,
        approvedByHRId: 0, // id of the user who is approving
        approvedByHROn: new Date(),
        emergencyDocId: 2323,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
]