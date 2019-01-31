# 办案日历项目开发文档

### 目录

- 功能概述
- 数据对照表


---

**1\. 功能概述**

&emsp;&emsp;项目主要包括案件信息录入、案件管理、案件定时提醒

---
**2\. 数据对照表**

通用字段说明

| 字段 | 类型 | 说明 |
| ------    | ------  | ------ | 
| id | int(11)| 主键：该数据ID|
| listorder | int(11) |自定义排序 |
| create_time | int(11) |创建时间 |
| update_time | int(11) |更新时间 |
| delete_time | bigint(13) |删除时间 |
| thirdapp_id | int(11) |关联thirdapp |
| user_no | varchar(255) |关联创建人user_no|
| status | tinyint(2) |状态:1正常；-1删除 |



user表

| 字段 | 类型 | 说明 |
| ------    | ------  | ------ | 
| nickname | varchar(255) | 微信昵称 |
| openid | varchar(255)| 微信openid |
| headImgUrl | varchar(9999) |  微信头像 |
| primary_scope| int(255) | 权限级别：90平台管理员;60超级管理员;30管理员;10用户 |
| user_type| itinyint(10) | 0,小程序用户;2,cms用户; |
| user_no| varchar(255)|用户编号|



label表

| 字段 | 类型 | 说明 |
| ------    | ------  | ------  | 
| title | varchar(40) | 菜单名称 |
| description| varchar(255) | 描述 |
| parentid| int(11) | 父级菜单ID |
| type | tinyint(2) |  1,menu;2,menu_item; |

article表

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(100) | 文章标题 |
| menu_id | int(11) | 关联label表 |
| description | varchar((255) | 描述 |
| content | text | 文章内容 |
| mainImg | varchar(9999) | 文章主图，一般在列表渲染 |



message表

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| plaintiff | varchar(50) | 原告 |
| plaintiff_agent | varchar(50) | 原告代理人 |
| defendant | varchar(50) | 被告 |
| defendant_agent | varchar(50) | 被告代理人 |
| third_person | varchar(50) | 第三人 |
| third_person_agent | varchar(50) | 第三人代理 |
| description | varchar(255) | 案由 |
| keywords | varchar(255) | 诉讼标的 |
| open_time | bigint(13) | 开庭时间 |
| mediate_time | bigint(13) | 调解时间 |
| location | varchar(100) | 开庭地点 |
| dispute | varchar(300) | 争议焦点 |
| question | varchar(300) | 需要查明的问题 |
| isnotice | varchar(100) | 是否已通知原被告 |
| court_staff | varchar(300) | 法庭组成人员 |
| law | varchar(500) | 办案法规 |
| programme | varchar(100) | 适用程序 |
| start_time | bigint(13) | 提醒开始时间 |
| end_time | bigint(13) | 提醒结束时间 |


Log表(站内信)

| 字段 | 类型 | 说明 |
| ------    |  :------:  | ------  | 
| title | varchar(255) | 提醒标题 |
| result  | varchar(255) | 提醒内容 |

---