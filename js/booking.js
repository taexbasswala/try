// Booking Manager Implementation

class BookingManager {
    constructor() {
        this.bookings = [];
    }

    // Method to check availability of a booking
    checkAvailability(date, timeSlot) {
        // Check if the specified date and time slot is available
        return !this.bookings.some(booking => booking.date === date && booking.timeSlot === timeSlot);
    }

    // Method to calculate pricing based on certain criteria
    calculatePricing(numberOfGuests) {
        const basePrice = 100; // Base price for booking
        const pricePerGuest = 20; // Additional price per guest
        return basePrice + (pricePerGuest * numberOfGuests);
    }

    // Method to create a booking
    createBooking(date, timeSlot, numberOfGuests) {
        if (this.checkAvailability(date, timeSlot)) {
            const totalCost = this.calculatePricing(numberOfGuests);
            this.bookings.push({ date, timeSlot, numberOfGuests, totalCost });
            return { success: true, message: 'Booking successful!', totalCost }; 
        } else {
            return { success: false, message: 'Selected time slot is not available.' };
        }
    }
}

// Example usage:
const manager = new BookingManager();
const availability = manager.checkAvailability('2026-01-22', '10:00-11:00');
const pricing = manager.calculatePricing(4);

const bookingResult = manager.createBooking('2026-01-22', '10:00-11:00', 4);
console.log(bookingResult); // Output: Booking confirmation or error message
