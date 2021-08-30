import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchDashboardUsers, dashboardUsersSelector } from './dashboardSlice';
import { useAppDispatch } from '../../app/hooks';
const DashBoard = () => {
  const dispatch = useAppDispatch();
  const dashboardUsers = useSelector(dashboardUsersSelector);

  const options = useMemo(() => {
    if (Object.keys(dashboardUsers).length) {
      return {
        title: {
          text: 'Dashboard',
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yAxis: {
          title: {
            text: 'Users count',
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            type: 'line',
            data: Object.values(dashboardUsers),
          },
        ],
      };
    }
    return {};
  }, [dashboardUsers]);

  useEffect(() => {
    dispatch(fetchDashboardUsers());
  }, [dispatch]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DashBoard;
