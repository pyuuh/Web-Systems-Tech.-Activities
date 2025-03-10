import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => email.endsWith('@gmail.com');
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
    return regex.test(password.trim());
  };
  const validateName = (name) => /^[A-Z][a-z]*$/.test(name);
  const validateUsername = (username) => {
    const specialCharMatch = username.match(/[^A-Za-z0-9]/g);
    return specialCharMatch && specialCharMatch.length === 1;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'username':
        newErrors.username = !validateUsername(value)
          ? 'Username must have exactly one special character and allow numbers.'
          : '';
        break;
      case 'email':
        newErrors.email = !validateEmail(value)
          ? 'Email must be a valid Gmail address.'
          : '';
        break;
      case 'firstName':
        newErrors.firstName = !validateName(value)
          ? 'First name must start with a capital letter.'
          : '';
        break;
      case 'lastName':
        newErrors.lastName = !validateName(value)
          ? 'Last name must start with a capital letter.'
          : '';
        break;
      case 'password':
        newErrors.password = !validatePassword(value)
          ? 'Password must be at least 8 characters long, including uppercase, lowercase, a number, and a special character.'
          : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => error === '')) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} />
          {errors.username && <span style={styles.error}>{errors.username}</span>}
        </div>
        <div>
          <label style={styles.label}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <label style={styles.label}>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={styles.input} />
          {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
        </div>
        <div>
          <label style={styles.label}>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={styles.input} />
          {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
        </div>
        <div style={styles.passwordContainer}>
          <label style={styles.label}>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.passwordInput}
          />
          <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Register</button>
        </div>
      </form>
      {isSubmitted && <p style={styles.success}>Registration successful!</p>}
    </div>
  );
};

// 🎨 Enhanced Styles for a Cute & Organized Look
const styles = {
  formContainer: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    border: '3px solid #ff69b4',
    borderRadius: '15px',
    backgroundColor: '#fff0f5',
    color: '#333',
    fontFamily: 'Comic Sans MS, cursive',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff1493',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#d63384',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    border: '2px solid #ff69b4',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#ff1493',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '18px',
  },
};

export default RegistrationForm;
