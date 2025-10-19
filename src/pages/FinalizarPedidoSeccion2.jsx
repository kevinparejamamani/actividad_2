import React from 'react'

export default function FinalizarPedidoSeccion2() {
  const html = `<h1>Formulario de Compra</h1>
   <!-- Componente: Datos de Compra -->
   <section id="medios-pago" aria-labelledby="titulo-medios-pago">
<h2 id="titulo-medios-pago">Medios de pago</h2>


<form id="form-medios-pago">
<fieldset>
<legend>Seleccione un medio de pago</legend>


<div>
<input type="radio" id="pago-tarjeta" name="medioPago" value="tarjeta" checked>
<label for="pago-tarjeta">Tarjeta de crédito / débito</label>
</div>


<div>
<input type="radio" id="pago-paypal" name="medioPago" value="paypal">
<label for="pago-paypal">PayPal</label>
</div>


<div>
<input type="radio" id="pago-transferencia" name="medioPago" value="transferencia">
<label for="pago-transferencia">Transferencia bancaria</label>
</div>


<div>
<input type="radio" id="pago-electronico" name="medioPago" value="electronico">
<label for="pago-electronico">YAPE / PLIN</label>
</div>
</fieldset>


<!-- Datos adicionales según el tipo de pago -->


<div id="datos-tarjeta">
<h3>Datos de tarjeta</h3>
<div>
<label for="titular">Titular</label>
<input type="text" id="titular" name="titular">
</div>


<div>
<label for="numero">Número de tarjeta</label>
<input type="text" id="numero" name="numero" maxlength="19">
</div>


<div>
<label for="mes">Mes (MM)</label>
<input type="text" id="mes" name="mes" maxlength="2">
</div>


<div>
<label for="ano">Año (AA)</label>
<input type="text" id="ano" name="ano" maxlength="2">
</div>
   <div>
       <a href="finalizar_pedido_seccion1.html"><button type="button" id="calcular">Calcular totales</button></a> 
    <button type="button" id="calcular">Finalizar</button></a>
   </div>
</section>`
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
