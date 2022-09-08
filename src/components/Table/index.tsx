import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';
import { useState } from 'react';

interface TableDataGridProps {
  columns: GridColDef[];
  rows: any;
}

const TableDataGrid = ({ columns, rows }: TableDataGridProps) => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '0.5rem',
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
};

export default TableDataGrid;
