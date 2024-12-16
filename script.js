document.getElementById("bookingForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = document.getElementById("bookingForm");
  const submitButton = document.querySelector(".btn"); // Select the submit button
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    type: document.getElementById("type").value,
    date: document.getElementById("date").value,
    destination: document.getElementById("destination").value.trim(),
  };

  // Show loading state
  submitButton.textContent = "Loading...";
  submitButton.disabled = true;

  try {
    const response = await fetch("https://ticket-project-blond.vercel.app/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        showPopup("Your ticket has been booked successfully!");
        form.reset(); // Reset all form inputs
      } else {
        showPopup("Failed to book your ticket. Please try again.");
      }
    } else {
      showPopup("Server error! Please try again later.");
    }
  } catch (error) {
    showPopup("An error occurred: " + error.message);
  } finally {
    // Reset button state
    submitButton.textContent = "Book Now";
    submitButton.disabled = false;
  }
});

// Show Popup Modal
function showPopup(message) {
  const modal = document.getElementById("confirmationModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

// Close Modal
function closeModal() {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
}
