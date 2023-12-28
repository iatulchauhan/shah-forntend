export const roles = [
    // { label: "Admin", id: "0", },
    { label: "User", id: 1, },
    { label: "Receptionist", id: 2, },
    { label: "Counsellor", id: 3, },
    { label: "Accountant", id: 4, },
    { label: "Marketing", id: 5, },
    { label: "Visitor", id: 6, },
]

export const Roles = {
    User: 1,
    Receptionist: 2,
    Counsellor: 3,
    Accountant: 4,
    Marketing: 5,
    Visitor: 6,
};

export const meetingStatus = {
    approvalPending: 0, approved: 1, onGoing: 2, completed: 3, canceled: 4
}

export const permissionStatus = {
    view: 0, create: 1, update: 2, delete: 3, active_inactive: 4
}