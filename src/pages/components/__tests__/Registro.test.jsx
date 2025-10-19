import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Registro from '../Registro.jsx';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <Registro />
    </BrowserRouter>
  );
};

describe('Validación de Campos del Formulario', () => {
  test('debe permitir ingresar nombres y apellidos', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nombreInput = screen.getByLabelText(/nombres:/i);
    const apellidoInput = screen.getByLabelText(/apellidos:/i);

    await user.type(nombreInput, 'Kevin Pareja');
    await user.type(apellidoInput, 'Pérez González');

    expect(nombreInput.value).toBe('Kevin Pareja');
    expect(apellidoInput.value).toBe('Pérez González');
  });

  test('debe permitir ingresar email válido', async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByLabelText(/correo electrónico:/i);
    
    await user.type(emailInput, 'usuario@ejemplo.com');
    expect(emailInput.value).toBe('usuario@ejemplo.com');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('debe permitir ingresar número de teléfono', async () => {
    const user = userEvent.setup();
    renderComponent();

    const telefonoInput = screen.getByLabelText(/número de teléfono:/i);
    
    await user.type(telefonoInput, '+51 999 888 777');
    expect(telefonoInput.value).toBe('+51 999 888 777');
    expect(telefonoInput).toHaveAttribute('type', 'tel');
  });

  test('debe permitir seleccionar fecha de nacimiento', async () => {
    const user = userEvent.setup();
    renderComponent();

    const fechaInput = screen.getByLabelText(/fecha de nacimiento:/i);
    
    await user.type(fechaInput, '1990-12-25');
    expect(fechaInput.value).toBe('1990-12-25');
    expect(fechaInput).toHaveAttribute('type', 'date');
  });

  test('debe permitir seleccionar género', async () => {
    const user = userEvent.setup();
    renderComponent();

    const generoSelect = screen.getByLabelText(/género:/i);
     
    expect(screen.getByText('Selecciona una opción')).toBeInTheDocument();
    expect(screen.getByText('Masculino')).toBeInTheDocument();
    expect(screen.getByText('Femenino')).toBeInTheDocument();

    await user.selectOptions(generoSelect, 'masculino');
    expect(generoSelect.value).toBe('masculino');
    

    await user.selectOptions(generoSelect, 'femenino');
    expect(generoSelect.value).toBe('femenino');
  });

  test('debe respetar campos requeridos', () => {
    renderComponent();

    const camposRequeridos = [
      screen.getByLabelText(/nombres:/i),
      screen.getByLabelText(/apellidos:/i),
      screen.getByLabelText(/correo electrónico:/i),
      screen.getByLabelText(/fecha de nacimiento:/i),
      screen.getByLabelText(/género:/i)
    ];

    camposRequeridos.forEach(campo => {
      expect(campo).toBeRequired();
    });
  });

  test('debe tener campo de teléfono como opcional', () => {
    renderComponent();

    const telefonoInput = screen.getByLabelText(/número de teléfono:/i);
    expect(telefonoInput).not.toBeRequired();
  });

  test('debe mantener valores correctos al ingresar datos', async () => {
    const user = userEvent.setup();
    renderComponent();


    await user.type(screen.getByLabelText(/nombres:/i), 'kevin Pareja');
    await user.type(screen.getByLabelText(/apellidos:/i), 'López Silva');
    await user.type(screen.getByLabelText(/correo electrónico:/i), 'kpareja@empresa.com');
    await user.type(screen.getByLabelText(/número de teléfono:/i), '+51 987 654 321');
    await user.type(screen.getByLabelText(/fecha de nacimiento:/i), '1985-07-11');
    await user.selectOptions(screen.getByLabelText(/género:/i), 'femenino');


    expect(screen.getByLabelText(/nombres:/i).value).toBe('kevin Pareja');
    expect(screen.getByLabelText(/apellidos:/i).value).toBe('López Silva');
    expect(screen.getByLabelText(/correo electrónico:/i).value).toBe('kpareja@empresa.com');
    expect(screen.getByLabelText(/número de teléfono:/i).value).toBe('+51 987 654 321');
    expect(screen.getByLabelText(/fecha de nacimiento:/i).value).toBe('1985-07-11');
    expect(screen.getByLabelText(/género:/i).value).toBe('femenino');
  });
});

describe('Validación de Tipos de Input', () => {
  test('debe tener los tipos de input correctos', () => {
    renderComponent();

    expect(screen.getByLabelText(/nombres:/i)).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText(/apellidos:/i)).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText(/correo electrónico:/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/número de teléfono:/i)).toHaveAttribute('type', 'tel');
    expect(screen.getByLabelText(/fecha de nacimiento:/i)).toHaveAttribute('type', 'date');
    expect(screen.getByLabelText(/género:/i).tagName).toBe('SELECT');
  });

  test('debe tener placeholders en campos de texto', () => {
    renderComponent();

    expect(screen.getByLabelText(/nombres:/i)).toHaveAttribute('placeholder', 'Ingresa tu nombre');
    expect(screen.getByLabelText(/apellidos:/i)).toHaveAttribute('placeholder', 'Ingresa tus apellidos');
    expect(screen.getByLabelText(/correo electrónico:/i)).toHaveAttribute('placeholder', 'ejemplo@correo.com');
    expect(screen.getByLabelText(/número de teléfono:/i)).toHaveAttribute('placeholder', '+51 999 999 999');
  });
});