export const navigation = [
    {
        'id'       : 'applications',
        'title'    : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'     : 'group',
        'icon'     : 'apps',
        'children' : [
            // {
            //     'id'       : 'dashboards',
            //     'title'    : 'Dashboards',
            //     'translate': 'NAV.DASHBOARDS',
            //     'type'     : 'collapse',
            //     'icon'     : 'dashboard',
            //     'children' : [
            //         {
            //             'id'   : 'analytics',
            //             'title': 'Analytics',
            //             'type' : 'item',
            //             'url'  : '/apps/dashboards/analytics'
            //         },
            //         {
            //             'id'   : 'project',
            //             'title': 'Project',
            //             'type' : 'item',
            //             'url'  : '/apps/dashboards/project'
            //         }
            //     ]
            // },
            // {
            //     'id'       : 'calendar',
            //     'title'    : 'Calendar',
            //     'translate': 'NAV.CALENDAR',
            //     'type'     : 'item',
            //     'icon'     : 'today',
            //     'url'      : '/apps/calendar'
            // },
            // {
            //     'id'       : 'e-commerce',
            //     'title'    : 'E-Commerce',
            //     'translate': 'NAV.ECOMMERCE',
            //     'type'     : 'collapse',
            //     'icon'     : 'shopping_cart',
            //     'children' : [
            //         {
            //             'id'   : 'dashboard',
            //             'title': 'Dashboard',
            //             'type' : 'item',
            //             'url'  : '/apps/e-commerce/dashboard'
            //         },
            //         {
            //             'id'        : 'products',
            //             'title'     : 'Products',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/products',
            //             'exactMatch': true
            //         },
            //         {
            //             'id'        : 'productDetail',
            //             'title'     : 'Product Detail',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/products/1/printed-dress',
            //             'exactMatch': true
            //         },
            //         {
            //             'id'        : 'orders',
            //             'title'     : 'Orders',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/orders',
            //             'exactMatch': true
            //         },
            //         {
            //             'id'        : 'orderDetail',
            //             'title'     : 'Order Detail',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/orders/1',
            //             'exactMatch': true
            //         }
            //     ]
            // },
            // {
            //     'id'       : 'academy',
            //     'title'    : 'Academy',
            //     'translate': 'NAV.ACADEMY',
            //     'type'     : 'item',
            //     'icon'     : 'school',
            //     'url'      : '/apps/academy'
            // },
            // {
            //     'id'       : 'mail',
            //     'title'    : 'Mail',
            //     'translate': 'NAV.MAIL.TITLE',
            //     'type'     : 'item',
            //     'icon'     : 'email',
            //     'url'      : '/apps/mail',
            //     'badge'    : {
            //         'title'    : 25,
            //         'translate': 'NAV.MAIL.BADGE',
            //         'bg'       : '#F44336',
            //         'fg'       : '#FFFFFF'
            //     }
            // },
            // {
            //     'id'       : 'mail-ngrx',
            
            {
                'id'       : 'my-issues',
                'title'    : 'My Issues',
                'translate': 'NAV.TODO',
                'type'     : 'item',
                'icon'     : 'check_box',
                'url'      : '/apps/todo',
                'badge'    : {
                    'title': 3,
                    'bg'   : '#FF6F00',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                    'id'       : 'issues',
                    'title'    : 'Issues',
                    'translate': 'NAV.MAIL.TITLE',
                    'type'     : 'item',
                    'icon'     : 'email',
                    'url'      : '/apps/todo-table',
                    'badge'    : {
                        'title'    : 25,
                        'translate': 'NAV.MAIL.BADGE',
                        'bg'       : '#F44336',
                        'fg'       : '#FFFFFF'
                    }
            },
           
            {
                'id'       : 'projects',
                'title'    : 'Projects',
                'translate': 'NAV.ACADEMY',
                'type'     : 'item',
                'icon'     : 'school',
                'url'      : '/apps/projects'
            },
            {
                    'id'       : 'issue-types',
                    'title'    : 'Issue Types',
                    'translate': 'NAV.CALENDAR',
                    'type'     : 'item',
                    'icon'     : 'today',
                    'url'      : '/apps/issuetypes'
                },
            {
                'id'       : 'log',
                'title'    : 'Log',
                'translate': 'NAV.CALENDAR',
                'type'     : 'item',
                'icon'     : 'today',
                'url'      : '/apps/log'
            }
            
        ]
    },
    
];
