import logo from '../assets/sparrow-logo.svg';

function TopNavigationBar() {
  return (
		<>
			{/* Sparrow logo is HUGE, put some temporary inline styling */}
			<img src={logo} alt="Sparrow Logo" style={{height: "28px"}}/>

			{/* Search input and button */}
			<input type="text" placeholder='Search chat for...' />
			<button>Search</button>

			{/* Profile */}
			<span> Placeholder Username </span>

			{/* Logout button */}
			<button>Logout</button>

		</>
	)
}

export default TopNavigationBar
