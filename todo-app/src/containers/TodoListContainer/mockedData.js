const mockedData = [
  {
    id: '1',
    status: 'open', //Open
    summary: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a arcu rutrum, egestas odio id, rutrum nulla. Sed lectus risus, aliquet in massa vitae, luctus consequat risus. Quisque mattis rutrum sem in scelerisque. Curabitur lacinia malesuada interdum. Aenean suscipit, elit at congue molestie, justo turpis porttitor risus, in feugiat quam mauris non arcu. Nunc tincidunt orci et neque posuere egestas. Donec nec facilisis arcu, et aliquet leo.',
    createdOn: new Date('2018-04-12'),
    dueDate: new Date('2016-12-06'),
    priority: 'High'
  },
  {
    id: '2',
    status: 'open',
    summary: 'In sodales ullamcorper faucibus',
    description:
      'In sodales ullamcorper faucibus. Sed interdum nulla sit amet nisi accumsan efficitur. In sit amet erat tempus, scelerisque est sit amet, porttitor neque. Vestibulum suscipit nunc et justo imperdiet semper. Ut posuere urna massa, in accumsan erat eleifend nec. Integer nibh nisi, faucibus vitae augue tincidunt, sagittis luctus ex. Proin ligula felis, sodales ac sem in, viverra pellentesque metus. Proin maximus metus ut pellentesque pulvinar. Mauris id enim aliquet velit tristique faucibus non vel neque. Mauris nec lectus sapien. Nulla elementum a ipsum et porta. Proin sit amet bibendum nulla, ac malesuada risus. Sed faucibus nunc odio, in facilisis dui convallis sed.',
    createdOn: new Date('2019-02-28'),
    dueDate: new Date('2014-06-04'),
    priority: 'Low'
  },
  {
    id: '3',
    status: 'completed',
    summary: 'Sed at condimentum ante.',
    description:
      'Sed at condimentum ante. Aenean molestie massa non neque mollis rutrum. Nulla facilisi. Curabitur tellus nulla, ullamcorper a diam eget, congue rhoncus velit. Suspendisse eu nunc quis ex accumsan consectetur vel vel erat. Nulla non urna consequat, volutpat massa in, mattis arcu. Donec pharetra elit sem, nec tincidunt neque semper sed. Nunc sed nibh ac libero ultrices finibus ut vel magna.',
    createdOn: new Date('2019-08-12'),
    dueDate: new Date('2019-04-12'),
    priority: 'High'
  },
  {
    id: '4',
    status: 'completed',
    summary: 'Fusce blandit feugiat rutrum.',
    description:
      'Fusce blandit feugiat rutrum. Ut at sollicitudin orci, eu dignissim tellus. Integer cursus aliquam purus nec mollis. Cras dignissim sapien eget lectus sagittis, vitae egestas tortor vulputate. Proin pulvinar dolor sed tincidunt tempus. Maecenas ante tortor, pulvinar et consequat in, cursus eu quam. Vestibulum molestie faucibus venenatis. Nam semper tortor at purus dictum, eu cursus lectus blandit. Vivamus suscipit ex eget nulla aliquam facilisis. Vestibulum consequat faucibus nisl in accumsan. Sed at mi ut lorem facilisis luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque at accumsan nulla. Etiam non iaculis tellus. Vestibulum consequat accumsan velit. Donec facilisis a lacus vel efficitur',
    createdOn: new Date('2018-04-02'),
    dueDate: new Date('2018-06-12'),
    priority: 'Low'
  },
  {
    id: '5',
    status: 'open',
    summary: 'Nam sed justo id orci consequat viverra',
    description:
      'Nam sed justo id orci consequat viverra eu ut nunc. Maecenas quis felis quis neque tincidunt iaculis nec eu est. Suspendisse at lectus dapibus magna vulputate luctus vitae at sem. Quisque venenatis erat eu eros dictum mollis. Nullam dapibus ipsum quis ex imperdiet, ut ultricies nunc mattis. Fusce velit velit, consectetur consectetur arcu vel, facilisis molestie dolor. Aenean id leo laoreet, vehicula orci vel, vestibulum odio. Quisque a tortor efficitur, placerat lacus at, pretium nisl. Fusce vel orci ullamcorper, pharetra quam sit amet, finibus diam.',
    createdOn: new Date('2018-09-12'),
    dueDate: new Date('2019-10-14'),
    priority: 'Medium'
  },
  {
    id: '6',
    status: 'completed',
    summary:
      'Donec accumsan nunc tellus, et ultricies mauris finibus porttitor.',
    description:
      'Donec accumsan nunc tellus, et ultricies mauris finibus porttitor. Mauris id purus odio. Fusce venenatis dignissim metus. Phasellus a nulla et lacus interdum tincidunt pretium vel purus. Pellentesque sit amet enim sed leo pulvinar maximus. Vivamus luctus massa ex, eu viverra nulla tempor non. Donec non leo convallis, tincidunt dui eget, gravida nisi. Vestibulum scelerisque sagittis ligula quis ultrices. Fusce ullamcorper condimentum purus sed faucibus.',
    createdOn: new Date('2018-09-12'),
    dueDate: new Date('2019-10-14'),
    priority: 'High'
  },
  {
    id: '7',
    status: 'open',
    summary: 'Phasellus eu augue volutpat, varius risus ut.',
    description:
      'Phasellus eu augue volutpat, varius risus ut, ornare nisl. In metus arcu, pellentesque ornare maximus vitae, scelerisque a augue. Praesent felis velit, commodo quis dictum non, sollicitudin et nibh. Integer imperdiet eget libero ac molestie. Nunc ac tristique risus. Pellentesque scelerisque nunc id ante commodo, molestie faucibus lorem posuere. Morbi convallis scelerisque rhoncus.',
    createdOn: new Date('2018-09-12'),
    dueDate: new Date('2019-12-14'),
    priority: 'Medium'
  },
  {
    id: '8',
    status: 'completed',
    summary: 'Sed tristique lectus varius justo semper imperdiet.',
    description:
      'Sed tristique lectus varius justo semper imperdiet. Nunc lacinia dolor nec ex ultricies ornare. Vestibulum eget sollicitudin sem, id luctus sem. Nunc aliquet nisi laoreet massa maximus hendrerit eget eget nibh. Nulla facilisi. Integer ac odio tempus, fermentum magna pharetra, consequat neque. Aenean sit amet leo felis. Nunc id mollis sem.',
    createdOn: new Date('2018-09-12'),
    dueDate: new Date('2019-8-14'),
    priority: 'Low'
  },
  {
    id: '9',
    status: 'completed',
    summary:
      'Maecenas elementum lacinia quam, nec rhoncus dui fringilla vitae. ',
    description:
      'Maecenas elementum lacinia quam, nec rhoncus dui fringilla vitae. Aliquam erat volutpat. Praesent eget libero eros. In placerat bibendum augue, ut tristique urna accumsan id. Nulla id iaculis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam semper vehicula mattis.',
    createdOn: new Date('2018-09-12'),
    dueDate: new Date('2014-10-14'),
    priority: 'High'
  },
  {
    id: '10',
    status: 'open',
    summary: 'Phasellus congue tincidunt erat. Quisque justo ipsum,',
    description:
      'Phasellus congue tincidunt erat. Quisque justo ipsum, gravida auctor erat id, maximus porta dolor. Quisque luctus lorem eu est accumsan porttitor. Fusce leo nibh, vestibulum sit amet odio eget, cursus vehicula justo. Etiam quis neque vel erat porta accumsan. Vivamus malesuada venenatis ante et iaculis. Suspendisse aliquam, ',
    createdOn: new Date('2015-09-12'),
    dueDate: new Date('2019-10-14'),
    priority: 'Medium'
  }
];

export default mockedData;
