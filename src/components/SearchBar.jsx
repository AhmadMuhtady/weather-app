const SearchBar = ({ onClick, onChange, searchInput, required = false }) => {
	return (
		<div className="w-full">
			<input
				type="text"
				value={searchInput}
				onChange={onChange}
				required={required}
				placeholder="Enter a City Name..."
				className="rounded-xl Semi-transparent background bg-white/10 placeholder-white/60 px-4 py-2 border border-grey/20 focus:outline-none focus:ring-2 focus:ring-white/50 m-5 text-white"
			/>

			<button
				className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 border border-white/20 transition-all duration-200 rounded-xl"
				onClick={onClick}
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
