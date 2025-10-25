const StatCard = ({ icon: Icon, label, value, color = 'text-cyan-400' }) => {
	return (
		<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 hover:scale-105">
			<div className="flex items-center gap-2 mb-2">
				<Icon size={18} className={color} />
				<p className="text-white/80 text-xs font-medium uppercase tracking-wide">
					{label}
				</p>
			</div>
			<p className="text-white text-xl font-bold">{value}</p>
		</div>
	);
};

export default StatCard;
