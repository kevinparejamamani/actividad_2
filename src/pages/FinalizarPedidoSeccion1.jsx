import React from 'react'

export default function FinalizarPedidoSeccion1() {
  const html = `<h1>Formulario de Compra</h1>
   <!-- Componente: Datos de Compra -->
   <section id="datos-compra" aria-labelledby="titulo-datos-compra">
   <h2 id="titulo-datos-compra">Datos de compra</h2>
   <section id="form-datos-compra">
   <div>
      <label for="nombre">Nombre completo</label>
      <input type="text" id="nombre" name="nombre" required>
   </div>
   <div>
      <label for="email">Correo electrónico</label>
      <input type="email" id="email" name="email" required>
   </div>
   <div>
      <label for="telefono">Teléfono</label>
      <input type="tel" id="telefono" name="telefono">
   </div>
   <div>
      <label for="direccion">Dirección de envío</label>
      <input type="text" id="direccion" name="direccion">
   </div>
   <div>
      <label for="departamento">Departamento</label>
      <select id="departamento" name="departamento">
         <option value="">Seleccione</option>
         <option value="cusco">Cusco</option>
         <option value="lima">Lima</option>
         <option value="arequipa">Arequipa</option>
         <option value="piura">Piura</option>
         <option value="la-libertad">La Libertad</option>
      </select>
   </div>
   <div>
      <label for="provincia">Provincia</label>
      <select id="provincia" name="provincia">
         <option value="">Seleccione</option>
         <option value="San Sebastian">San Sebastian</option>
         <option value="callao">Lima</option>
         <option value="arequipa">Arequipa</option>
         <option value="piura">Piura</option>
         <option value="trujillo">trujillo</option>
      </select>
   </div>
   <div>
      <label for="distrito">Distrito</label>
      <select id="distrito" name="distrito">
         <option value="">Seleccione</option>
         <option value="San Sebastian">San Sebastian</option>
         <option value="callao">Lima</option>
         <option value="arequipa">Arequipa</option>
         <option value="piura">Piura</option>
         <option value="trujillo">trujillo</option>
      </select>
   </div>
   <div>
      <label for="referencia">Lugar de referencia</label>
      <input type="text" id="referencia" name="referencia">
   </div>
   <fieldset>
      <legend>Productos</legend>
      <div>
         <label for="producto-nombre">Nombre del producto(1)</label>
         <input type="text" id="producto-nombre" name="productoNombre">
      </div>
      <div>
         <label for="producto-cantidad">Cantidad</label>
         <input type="number" id="producto-cantidad" name="productoCantidad" min="1" value="1">
      </div>
      <div>
         <label for="producto-precio">Precio unitario (S/.)</label>
         <input type="number" id="producto-precio" name="productoPrecio" min="0" step="0.01" value="0.00">
      </div>
      <hr>
      <div>
         <label for="producto-nombre">Nombre del producto(2)</label>
         <input type="text" id="producto-nombre" name="productoNombre">
      </div>
      <div>
         <label for="producto-cantidad">Cantidad</label>
         <input type="number" id="producto-cantidad" name="productoCantidad" min="1" value="1">
      </div>
      <hr>
      <div>
         <label for="producto-nombre">Nombre del producto(3)</label>
         <input type="text" id="producto-nombre" name="productoNombre">
      </div>
      <div>
         <label for="producto-cantidad">Cantidad</label>
         <input type="number" id="producto-cantidad" name="productoCantidad" min="1" value="1">
      </div>
      <div>
         <label for="producto-precio">Precio unitario (S/.)</label>
         <input type="number" id="producto-precio" name="productoPrecio" min="0" step="0.01" value="0.00">
      </div>
   </fieldset>
   <div>
      <label for="subtotal">Subtotal</label>
      <input type="text" id="subtotal" name="subtotal" readonly>
   </div>
   <div>
      <label for="impuesto">Impuesto (porcentaje)</label>
      <input type="number" id="impuesto" name="impuesto" min="0" step="0.01" value="0">
   </div>
   <div>
      <label for="total">Total</label>
      <input type="text" id="total" name="total" readonly>
   </div>
   <div>
      <button type="button" id="calcular">Calcular totales</button>
      <a href="finalizar_pedido_seccion2.html"><button type="button" id="calcular">Continuar</button></a>
   </div>
   </section>
 </form>`
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
