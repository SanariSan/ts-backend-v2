import FormData from "form-data";

const makeForm = ({ obj }) => {
	return Object.entries(obj).reduce((acc, [key, val]) => {
		acc.append(String(key), val);
		return acc;
	}, new FormData());
};

export { makeForm };
