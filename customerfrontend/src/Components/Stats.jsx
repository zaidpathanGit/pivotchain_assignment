import { Card, Statistic } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getStatsAPI } from "../API/API";
import { NOTIFICATION_MESSAGES, notifications } from "../Utils/Notifications";

function Stats() {
  const { pathname } = useLocation();
  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats();
  }, [pathname]);

  function getStats() {
    getStatsAPI()
      .then((res) => {
        if (res.ok) {
          return res.json().then((results) => setStats(results));
        }
      })
      .catch((error) => {
        notifications("error", "Error", NOTIFICATION_MESSAGES.GET_STATS_ERROR);
      });
  }

  return (
    <section className="statistic">
      {Object.keys(stats).map((key) => (
        <Card
          hoverable={true}
          key={key}
          bordered={false}
          className="statistic__info"
          size="small"
        >
          <Statistic title={key} value={stats[key]} />
        </Card>
      ))}
    </section>
  );
}

export default Stats;
