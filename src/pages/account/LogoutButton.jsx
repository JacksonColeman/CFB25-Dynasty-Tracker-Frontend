const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/session", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Logged out successfully:", result);
        alert("You have been logged out.");
        // Optional: Redirect to the login page or homepage
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.error("Error during logout:", errorData);
        alert(`Error: ${errorData.error || "Failed to log out"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("A network error occurred while trying to log out.");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
