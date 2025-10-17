package helper

import (
	"fmt"
	"strings"
)

func GreetUsers(conferenceTickets int, remainingTickets uint, conferenceName string) {
	fmt.Printf("Welcome to %v booking application\n", conferenceName)
	fmt.Printf("We have a total of %v tickets and %v are still available.\n", remainingTickets, conferenceTickets)
	fmt.Println("Get your tickets here to attend")
}

func GetUserInput() (string, string, uint) {
	var userName string
	var email string
	var userTickets uint
	fmt.Println("Enter your name:")
	fmt.Scan(&userName)
	fmt.Println("Enter your email:")
	fmt.Scan(&email)
	fmt.Println("Enter number of tickets:")
	fmt.Scan(&userTickets)
	return userName, email, userTickets
}

func GetFirstNames(bookings []map[string]string) []string {
	firstNames := []string{}
	for _, booking := range bookings {
		firstNames = append(firstNames, strings.Fields(booking["userName"])[0])
	}
	fmt.Printf("The first names of bookings are: %v \n", firstNames)
	return firstNames
}

func BookTicket(bookings []map[string]string, email string, userTickets uint, remainingTickets uint) {
	remainingTickets = remainingTickets - uint(userTickets)
	println(fmt.Sprint(remainingTickets) + "=" + fmt.Sprint(remainingTickets) + "-" + fmt.Sprint(userTickets))
	fmt.Printf("We have %v tickets remaining for the conference\n", remainingTickets)
	fmt.Println("Thank you for booking. You will receive a confirmation email at", email)
	fmt.Printf("Thank you for booking.%v \n", bookings)
}

func ValidateUserInput(userName string, email string, userTickets uint, remainingTickets uint) (bool, bool, bool) {
	isValidName := len(userName) >= 2
	isValidEmail := strings.Contains(email, "@")
	isValidTicketNumber := userTickets > 0 && userTickets <= remainingTickets
	return isValidName, isValidEmail, isValidTicketNumber
}
