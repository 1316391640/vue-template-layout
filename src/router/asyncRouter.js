export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'DesktopOutlined',
    },
  },
  {
    path: '/jurisdiction',
    name: 'jurisdiction',
    redirect: '/jurisdiction/peopleManagement',
    meta: {
      title: '权限管理',
      icon: 'LockOutlined',
    },
    children: [
      {
        path: 'peopleManagement',
        name: 'peopleManagement',
        component: () => import('@/views/peopleManagement/index.vue'),
        meta: {
          title: '人员管理',
          icon: 'MehOutlined',
        },
      },
    ],
  },
  {
    path: '/information',
    name: 'information',
    redirect: '/information/infoManagement',
    meta: {
      title: '信息管理',
      icon: 'PartitionOutlined',
    },
    children: [
      {
        path: 'infoManagement',
        name: 'infoManagement',
        component: () => import('@/views/infoManagement/index.vue'),
        meta: {
          title: '资料管理',
          icon: 'RobotOutlined',
        },
      },
    ],
  },
]
