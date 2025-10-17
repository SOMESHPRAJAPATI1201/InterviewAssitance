package main

import (
	"booking-app/helper"
	"fmt"
	"strconv"
)

const conferenceTickets int = 50
const conferenceName = "Go Conference"

var remainingTickets uint = 50

func main() {

	helper.GreetUsers(conferenceTickets, remainingTickets, conferenceName)

	var userName string
	var email string
	var userTickets uint
	bookings := make([]map[string]string, 0)

	type UsersData struct {
		userName    string
		email       string
		userTickets uint
	}

	userList := make([]UsersData, 0)

	fmt.Println(userList)

	for {
		userName, email, userTickets = helper.GetUserInput()
		isValidName, isValidEmail, isValidTicketNumber := helper.ValidateUserInput(userName, email, userTickets, remainingTickets)

		if isValidName && isValidEmail && isValidTicketNumber {
			fmt.Println("Your input is invalid,try again...")
			continue
		}

		var userData = make(map[string]string)
		userData["userName"] = userName
		userData["email"] = email
		userData["userTickets"] = strconv.FormatUint(uint64(userTickets), 10)

		var usersData = UsersData{
			userName:    userName,
			email:       email,
			userTickets: userTickets,
		}

		userList = append(userList, usersData)
		bookings = append(bookings, userData)
		helper.GetFirstNames(bookings)
		println(bookings)
		fmt.Printf("User %v booked %v tickets with email: %v.\n", userName, userTickets, email)
		if userTickets > remainingTickets {
			println("We only have", remainingTickets, "tickets remaining, so you can't book", userTickets, "tickets")
			continue
		}

		helper.BookTicket(bookings, email, userTickets, remainingTickets)

		println(userList[0].userName)

		if remainingTickets <= 0 {
			fmt.Println("Our conference halls are booked out. Come back next year.")
			break
		}
	}
}
