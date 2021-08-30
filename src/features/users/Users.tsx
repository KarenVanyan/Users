import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Paper } from '@material-ui/core';
import { PagingState, CustomPaging, SelectionState } from '@devexpress/dx-react-grid';
import { useSelector } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import { useAppDispatch } from '../../app/hooks';
import { fetchUsersList, getUsersList } from './usersSlice';

const columns = [
  { name: 'email', title: 'Email' },
  { name: 'fullName', title: 'Full name' },
  { name: 'gender', title: 'Gender' },
  { name: 'city', title: 'City' },
  { name: 'address', title: 'Address' },
];

export const Users = () => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState({
    page: 1,
    gender: '',
    limit: 50,
  });
  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([]);

  const users = useSelector(getUsersList);

  const finalUsers = useMemo(() => Object.values(users), [users]);

  const pageChangeHandler = useCallback((page) => {
    setOptions((options) => ({ ...options, page }));
  }, []);

  const pageSizeChangeHandler = useCallback((limit) => {
    setOptions((options) => ({ ...options, limit }));
  }, []);

  const selectChangeHandler = useCallback((ids: Array<number | string>) => {
    setSelectedIds(ids);
  }, []);

  useEffect(() => {
    dispatch(fetchUsersList(options));
  }, [options, dispatch]);

  return (
    <Paper>
      <Grid
        rows={finalUsers}
        columns={columns}
        getRowId={(row) => row.id}
      >
        <SelectionState selection={selectedIds} onSelectionChange={selectChangeHandler} />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={50}
          onCurrentPageChange={pageChangeHandler}
          onPageSizeChange={pageSizeChangeHandler}
        />
        <CustomPaging totalCount={1500} />
        <Table />
        <TableHeaderRow />
        <TableSelection />
        <PagingPanel pageSizes={[50, 100, 150, 0]} />
      </Grid>
    </Paper>
  );
};

export default Users;
