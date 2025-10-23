import { ClimbingBoxLoader } from 'react-spinners';

const cssOverride = {
	display: 'block',
	margin: '0 auto 50px auto',
};

const Spinner = ({ color = 'blue', size = '50px', cssOverride }) => {
	return (
		<div>
			<ClimbingBoxLoader
				color={color}
				size={size}
				cssOverride={cssOverride}
				aria-label="Loading..."
			/>
		</div>
	);
};

export default Spinner;
