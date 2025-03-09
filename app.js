// 诗词数据集路径数组
const dataFiles = [
  'data/shijing.json',
  'data/宋词三百首.json',
  'data/唐诗三百首.json',
  'data/宋词三百首.json',
  'data/唐诗三百首.json',
  'data/元.json',
  'data/明_1.json',
  'data/清_1.json',
  'data/魏晋.json',
  'data/近现代.json'
];

// 元素选择器
const elements = {
  title: document.getElementById('poemTitle'),
  author: document.getElementById('poemAuthor'),
  content: document.getElementById('poemContent'),
  generateBtn: document.getElementById('generateBtn'),
  themeToggle: document.getElementById('themeToggle')
};

// 加载随机诗词
async function loadRandomPoem() {
  try {
    // 随机选择数据文件
    const filePath = dataFiles[Math.floor(Math.random() * dataFiles.length)];
    const response = await fetch(filePath);
    const data = await response.json();
    
    // 随机选择诗词
    const poem = data[Math.floor(Math.random() * data.length)];
    
    // 更新页面内容
    elements.title.textContent = `《${poem.title}》`;
    elements.author.textContent = poem.author || '佚名';
    elements.content.textContent = poem.content || poem.paragraphs?.join('\n');
  } catch (error) {
    console.error('加载诗词失败:', error);
    elements.content.textContent = '未能获取诗词，请重试';
  }
}

// 主题切换功能
function toggleTheme() {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  
  // 保存主题状态
  localStorage.setItem('themePreference', isDark ? 'light' : 'dark');
  
  // 更新按钮文字
  elements.themeToggle.textContent = isDark ? '🌓 ' : '🌒 ';
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('themePreference') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  elements.themeToggle.textContent = savedTheme === 'dark' ? '🌒 ' : '🌓 ';
}

// 事件监听
elements.generateBtn.addEventListener('click', loadRandomPoem);
elements.themeToggle.addEventListener('click', toggleTheme);

// 初始化
initTheme();
loadRandomPoem();

// 新增星空动画逻辑
const StarField = {
  canvas: document.getElementById('starCanvas'),
  ctx: null,
  stars: [],
  maxStars: 200,

  init() {
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createStars();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createStars() {
    for(let i = 0; i < this.maxStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.05 + 0.05
      });
    }
  },

  drawStars() {
    const theme = document.body.getAttribute('data-theme');
    this.ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
    
    this.stars.forEach(star => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      this.ctx.fill();
      
      star.x += star.speed;
      if(star.x > this.canvas.width) star.x = 0;
    });
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawStars();
    requestAnimationFrame(() => this.animate());
  }
};

// 初始化星空动画
StarField.init();