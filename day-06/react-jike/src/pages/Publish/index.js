import {Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload} from 'antd'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {useEffect, useState} from "react"
import {createArticleAPI, getArticleByIdAPI, updateArticleAPI} from "@/apis/article"
import {PlusOutlined} from "@ant-design/icons"
import {useChannelList} from "@/hooks/useChannelList"
import article from "@/pages/Article"

const {Option} = Select

const Publish = () => {
  const {channelList} = useChannelList()

  // 提交表单
  const onFinish = (formValue) => {
    // 校验 imageType 和 imageList 是否匹配
    if (imageList.length !== imageType) {
      return message.warning('封面类型和图片数量不匹配')
    }

    const {title, content, channel_id} = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          if (item.response) {
            // 只有新增才能按这个逻辑
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id
    }
    if (articleId) {
      // 编辑
      updateArticleAPI({...reqData, id: articleId})
    } else {
      // 新增
      createArticleAPI(reqData)
    }
  }

  // 上传图片回调
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    setImageList(value.fileList)
  }

  // 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取实例
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleByIdAPI(articleId)
      const data = res.data
      const {cover} = data
      form.setFieldsValue({
        ...data,
        type: cover.type,
      })
      // 为什么现在的写法无法回填封面？
      // 数据结构不一样
      setImageType(cover.type)
      setImageList(cover.images.map(url => {
        return {url}
      }))
    }
    // 只有有 id 的时候才调用
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            {title: <Link to={'/'}>首页</Link>},
            {title: `${articleId ? '编辑' : '发布'}文章`},
          ]}
          />
        }
      >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          initialValues={{type: 0}}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{required: true, message: '请输入文章标题'}]}
          >
            <Input placeholder="请输入文章标题" style={{width: 400}} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{required: true, message: '请选择文章频道'}]}
          >
            <Select placeholder="请选择文章频道" style={{width: 400}}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              name='image'
              listType="picture-card"
              showUploadList
              action='http://geek.itheima.net/v1_0/upload'
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{marginTop: 8}}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{required: true, message: '请输入文章内容'}]}
          >
            <ReactQuill
              className='publish-quill'
              theme="snow"
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 4}}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish