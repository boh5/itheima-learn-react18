import {DatePicker, NavBar} from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react"
import classNames from "classnames"
import dayjs from "dayjs"
import {useSelector} from "react-redux"
import _ from "lodash"
import DayBill from "@/pages/Month/components/DayBill"

const MONTH_DATE_FORMAT = 'YYYY-MM'
const DAY_DATE_FORMAT = 'YYYY-MM-DD'

const Month = () => {
  // 按月做数据分组
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format(MONTH_DATE_FORMAT))
  }, [billList]);

  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  // 控制时间显示
  const [currentDate, setCurrentDate] = useState(() => new Date())

  // 当前月数据
  const [currentMonthList, setCurrentMonthList] = useState([])

  const monthResult = useMemo(() => {
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])

  // 初始化的时候，把当前月的统计数据显示出来
  useEffect(() => {
    setCurrentMonthList(monthGroup[dayjs().format(MONTH_DATE_FORMAT)] || [])
  }, [monthGroup]);

  // 确认回调
  const onConfirm = (date) => {
    setCurrentDate(date)
    setCurrentMonthList(monthGroup[dayjs(date).format(MONTH_DATE_FORMAT)] || [])
  }

  // 当前月按日分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format(DAY_DATE_FORMAT))
    const keys = Object.keys(groupData).sort()
    return {
      groupData,
      keys
    }
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {dayjs(currentDate).format(MONTH_DATE_FORMAT)}月账单
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            value={currentDate}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {
          dayGroup.keys.map(key => <DayBill key={key} date={key} billList={dayGroup.groupData[key]} />)
        }
      </div>
    </div>
  )
}

export default Month