<table
	data-content-type="application/json"
	data-data-type="json"
	data-toggle="table"
	data-url="{{ url('api/pages') }}"
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
	        <th data-field="name" data-align="center" data-valign="middle" data-sortable="true">Denumire</th>
	        <th data-field="slug" data-align="center" data-valign="middle" data-sortable="true">Link</th>
	        <th data-field="parent" data-align="center" data-valign="middle" data-sortable="true">Pagina principala</th>
	        <th data-field="active" data-align="center" data-valign="middle" data-sortable="true" data-formatter="StatusFormatter">Status</th>
	        <th data-field="updated_at" data-align="center" data-valign="middle" data-sortable="true">Ultimul update</th>
	        <th data-field="sections" data-align="center" data-valign="middle" data-sortable="false" data-formatter="SectionsFormatter">Sectiuni</th>
	        {{-- <th data-field="seo" data-align="center" data-valign="middle" data-sortable="false" data-formatter="SeoFormatter">SEO</th> --}}
	        <th data-field="actions" data-align="center" data-valign="middle" data-sortable="false" data-formatter="ActionsFormatter">Actiuni</th>
	    </tr>
    </thead>
</table>