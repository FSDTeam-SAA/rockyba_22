export const bookingAdminEmail = (booking: any) => `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #d9534f;">New Booking Notification</h2>

    <p>A new booking has been received. Below are the details:</p>

    <h3>📋 Booking Details</h3>
    <ul>
      <li><strong>Apartment Size:</strong> ${booking.apartmentSize}</li>
      <li><strong>Cleaning Interval:</strong> ${booking.cleaningInterval}</li>
      <li><strong>Household Size:</strong> ${booking.householdSize}</li>
      <li><strong>Cleaning Package:</strong> ${
        booking.cleaningPackage.type
      }</li>
      <li><strong>Special Wish:</strong> ${booking.specialWish || "None"}</li>
    </ul>

    <h3>📅 Appointment</h3>
    <ul>
      <li><strong>Has Preferred Date:</strong> ${
        booking.appointment.hasPreferredDate ? "Yes" : "No"
      }</li>
      <li><strong>Preferred Date:</strong> ${
        booking.appointment.preferredDate
          ? new Date(booking.appointment.preferredDate).toLocaleDateString()
          : "N/A"
      }</li>
      <li><strong>Preferred Time:</strong> ${
        booking.appointment.preferredTime || "N/A"
      }</li>
    </ul>

    <h3>👤 Customer Information</h3>
    <ul>
      <li><strong>Name:</strong> ${booking.personalInfo.salutation} ${
  booking.personalInfo.firstName
} ${booking.personalInfo.lastName}</li>
      <li><strong>Phone:</strong> ${booking.personalInfo.phone}</li>
      <li><strong>Email:</strong> ${booking.personalInfo.email}</li>
      <li><strong>Address:</strong> ${booking.personalInfo.address.street} ${
  booking.personalInfo.address.houseNumber
}, ${booking.personalInfo.address.zipCode} ${
  booking.personalInfo.address.city
}</li>
      <li><strong>How Did They Find Us:</strong> ${
        booking.personalInfo.howDidYouFindUs || "N/A"
      }</li>
    </ul>

    <h3>💵 Price</h3>
    <ul>
      <li><strong>Price per Cleaning:</strong> $${booking.price.perCleaning.toFixed(
        2
      )}</li>
      <li><strong>Total Price:</strong> $${booking.price.total.toFixed(2)}</li>
    </ul>

    <p style="margin-top: 20px; font-size: 12px; color: #999;">
      This is an automated notification sent to administrators.
    </p>
  </div>
`;
