import { authService } from "../services/authService";

function Home() {
  const testConnection = async () => {
    try {
      const response = await authService.register({
        username: "Test User",
        email: "test123@gmail.com",
        password: "12345678",
      });
      console.log(response);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <div>
      <h1>Welcome to TaskFlow 🚀</h1>
      <button onClick={testConnection}>Test Backend Connection</button>
    </div>
  );
}

export default Home;
