<table
	id="ajax_table"
	data-content-type="application/json"
	data-data-type="json"
	data-toggle="table"
	data-url="{{ url('api/sections') }}"
	data-toolbar="#toolbar"
	data-show-refresh="true"
	data-search="true"
	data-select-item-name="toolbar1"
	data-pagination="true"
	data-sort-name="id"
	data-sort-order="asc"
	data-flat="true"
	data-row-style="rowStyle"
	class="table table-hover">
    <thead>
	    <tr>
	        <th data-field="code" data-align="center" data-valign="middle" data-sortable="true">Cod</th>
	        <th data-field="title" data-align="center" data-valign="middle" data-sortable="true">Titlu</th>
	        <th data-field="active" data-align="center" data-valign="middle" data-sortable="true" data-formatter="StatusFormatter">Status</th>
	        <th data-field="actions" data-align="center" data-valign="middle" data-sortable="false" data-formatter="ActionsFormatter">Actiuni</th>
	    </tr>
    </thead>
</table>