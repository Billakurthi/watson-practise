
module.exports = {


    //user template
    new_user_template: {
        "id": "facebookUserID",
        "name": "facebookUserName",
        "manager": {
            "id": "managerID",
            "name": "managerName"
        },
        "role": "client"
    },


    //ticket template
    new_ticket_template: {
        "_id": "ticketID",
        "Status": "TicketStatus Open or Close",
        "client": "Client Company Name",
        "Product": "Product Name",
        "Severity": "1- Highest(2 Hours) or 2-Medium(1 Day) or 3-Low(3 Weeks)",
        "Date": {
            "Created": "Ticket created Date",
            "Modified": "Last Modified Date",
            "Closed": "Date Closed"
        },
        "Category": "Ticket Category Internal, Client Query, Client Issue",
        "Description": "Ticket Description",
        "Comments": [
            {
                "commentBy": "Person Name who made comment",
                "commentTime": "Comment Time"
            }
        ],
        "TimeSpent": "TimeSpent in Minutes"
    }
}

