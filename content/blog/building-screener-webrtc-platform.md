---
title: "Building Screener: A Complete WebRTC Live Streaming & Recording Platform"
date: "2025-01-20"
description: "Deep dive into building a professional video collaboration platform with WebRTC, screen recording, and cloud video management using Next.js 15 and modern web technologies."
tags: ["WebRTC", "Next.js", "TypeScript", "Screen Recording", "Video Streaming", "Real-time"]
---

# Building Screener: A Complete WebRTC Live Streaming & Recording Platform

Creating a professional video collaboration platform that rivals tools like Zoom and Loom entirely in the browser was an ambitious project that pushed the boundaries of modern web technologies. Today, I'm excited to share the technical journey behind **Screener** - a complete live streaming and recording platform built with cutting-edge web APIs.

🚀 **[Live Demo](https://screener-lemon.vercel.app)** | **[GitHub Repository](https://github.com/Flash0104/screener)**

## 🎯 The Vision

Screener was born from a simple question: *Can we build a professional-grade video collaboration platform that runs entirely in the browser without any downloads?* The answer turned out to be a resounding yes, thanks to modern web APIs and frameworks.

### Core Features Delivered

- **🔴 Live Streaming**: Real-time peer-to-peer video calls with WebRTC
- **📹 Professional Recording**: High-quality screen + camera recording
- **☁️ Cloud Management**: Automatic video processing and storage
- **🎮 Interactive Gallery**: Browse, preview, and manage all recordings

## 🧩 Technical Architecture

### Frontend Excellence

The frontend is built with the latest and greatest web technologies:

```typescript
// Tech Stack
- Next.js 15.3.3 with App Router
- TypeScript for full type safety
- Tailwind CSS 4 for modern styling
- Framer Motion for smooth animations
- WebRTC for peer-to-peer communication
- MediaRecorder API for screen recording
- Socket.io Client for real-time signaling
```

### Backend & Infrastructure

The backend leverages serverless architecture with edge functions:

```typescript
// Backend Stack
- Next.js API Routes with edge functions
- Prisma ORM 6.9.0 for type-safe database operations
- Supabase PostgreSQL with connection pooling
- Socket.io Server for WebRTC signaling
- Cloudinary for video hosting and optimization
- Zod for runtime type validation
```

## 🎥 WebRTC Implementation Deep Dive

The heart of Screener is its WebRTC implementation, which enables direct peer-to-peer video communication without any intermediate servers.

### Signaling Server Architecture

```typescript
// Socket.io signaling for WebRTC coordination
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
  
  // Handle WebRTC offer/answer/ice-candidates
  socket.on('offer', (offer, roomId) => {
    socket.to(roomId).emit('offer', offer);
  });
  
  socket.on('answer', (answer, roomId) => {
    socket.to(roomId).emit('answer', answer);
  });
  
  socket.on('ice-candidate', (candidate, roomId) => {
    socket.to(roomId).emit('ice-candidate', candidate);
  });
});
```

### Peer Connection Management

The most challenging part was managing peer connections reliably:

```typescript
// WebRTC Peer Connection setup
const createPeerConnection = async () => {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  });
  
  // Handle ice candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate, roomId);
    }
  };
  
  // Handle remote stream
  pc.ontrack = (event) => {
    const remoteVideo = document.getElementById('remoteVideo');
    if (remoteVideo) {
      remoteVideo.srcObject = event.streams[0];
    }
  };
  
  return pc;
};
```

## 📹 Screen Recording with MediaRecorder

Implementing professional screen recording required mastering the MediaRecorder API and handling various browser constraints.

### Advanced Screen Capture

```typescript
// Screen + Camera recording with perfect synchronization
const startRecording = async () => {
  try {
    // Get screen stream
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen', width: 1920, height: 1080 },
      audio: true
    });
    
    // Get camera stream
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: true
    });
    
    // Combine streams for picture-in-picture effect
    const combinedStream = new MediaStream([
      ...screenStream.getVideoTracks(),
      ...screenStream.getAudioTracks(),
      ...cameraStream.getVideoTracks()
    ]);
    
    // Configure MediaRecorder with optimal settings
    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm;codecs=vp9,opus',
      videoBitsPerSecond: 2500000,
      audioBitsPerSecond: 128000
    });
    
    const chunks: Blob[] = [];
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      handleVideoUpload(blob);
    };
    
    mediaRecorder.start();
    setRecording(true);
    
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};
```

### Draggable Camera Overlay

One of the unique features is the draggable camera overlay that allows users to position their camera feed anywhere on the screen:

```typescript
// Draggable camera positioning with React
const CameraOverlay = ({ stream }: { stream: MediaStream }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div
      className={`absolute z-50 rounded-lg overflow-hidden border-2 border-white shadow-lg cursor-move ${
        isDragging ? 'opacity-80' : 'opacity-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: '200px',
        height: '150px'
      }}
      onMouseDown={handleMouseDown}
    >
      <video
        ref={(video) => {
          if (video && stream) {
            video.srcObject = stream;
            video.play();
          }
        }}
        className="w-full h-full object-cover"
        muted
      />
    </div>
  );
};
```

## ☁️ Cloud Video Pipeline

Video management is handled through a robust cloud pipeline using Cloudinary for storage, optimization, and CDN delivery.

### Cloudinary Integration

```typescript
// Video upload with automatic thumbnail generation
const uploadToCloudinary = async (videoBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', videoBlob);
  formData.append('upload_preset', 'screener_videos');
  formData.append('resource_type', 'video');
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    {
      method: 'POST',
      body: formData
    }
  );
  
  const data = await response.json();
  return data.secure_url;
};

// Database integration with Prisma
const saveVideoMetadata = async (videoData: {
  title: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
}) => {
  const video = await prisma.video.create({
    data: {
      title: videoData.title,
      url: videoData.url,
      thumbnailUrl: videoData.thumbnailUrl,
      duration: videoData.duration,
      createdAt: new Date()
    }
  });
  
  return video;
};
```

### Smart Thumbnail Generation

Cloudinary automatically generates thumbnails for video previews:

```typescript
// Generate thumbnail URL from video URL
const generateThumbnail = (videoUrl: string): string => {
  return videoUrl.replace('/upload/', '/upload/so_auto,w_400,h_300,c_fill/');
};
```

## 🎨 User Experience Excellence

### Three-Tab Interface

The interface is organized into three main sections:

1. **Live Stream Tab**: WebRTC video calls with room-based system
2. **Record Tab**: Screen recording with camera overlay
3. **Gallery Tab**: Video management and playback

```tsx
// Main navigation component
const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('stream');
  
  const tabs = [
    { id: 'stream', label: 'Live Stream', icon: Video, color: 'from-red-500 to-pink-500' },
    { id: 'record', label: 'Record', icon: Circle, color: 'from-blue-500 to-purple-500' },
    { id: 'gallery', label: 'Gallery', icon: Grid, color: 'from-green-500 to-teal-500' }
  ];
  
  return (
    <div className="flex space-x-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          <tab.icon className="w-5 h-5" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
```

### Real-time Feedback

Toast notifications provide immediate feedback for all user actions:

```typescript
// Toast notification system
const showToast = (message: string, type: 'success' | 'error' | 'info') => {
  toast({
    title: type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info',
    description: message,
    variant: type === 'error' ? 'destructive' : 'default',
    duration: 3000
  });
};

// Usage throughout the application
const handleRecordingStart = () => {
  startRecording();
  showToast('Recording started successfully!', 'success');
};

const handleUploadComplete = () => {
  refreshGallery();
  showToast('Video uploaded and processed!', 'success');
};
```

## 🔒 Security & Performance

### Input Validation with Zod

All API endpoints use Zod for runtime type validation:

```typescript
// Video upload validation schema
const VideoUploadSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  file: z.instanceof(File).refine(
    (file) => file.size <= 100 * 1024 * 1024, // 100MB limit
    'File size must be less than 100MB'
  ).refine(
    (file) => ['video/webm', 'video/mp4'].includes(file.type),
    'Only WebM and MP4 files are allowed'
  )
});

// API route with validation
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const validation = VideoUploadSchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      file: formData.get('file')
    });
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }
    
    // Process upload...
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

### Performance Optimizations

Several optimization techniques ensure smooth performance:

```typescript
// Connection pooling for database
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?pgbouncer=true&connection_limit=1'
    }
  }
});

// Video compression settings
const compressionSettings = {
  video: {
    codec: 'vp9',
    bitrate: 2500000,
    framerate: 30
  },
  audio: {
    codec: 'opus',
    bitrate: 128000,
    sampleRate: 48000
  }
};

// Lazy loading for video gallery
const VideoGallery = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const loadMoreVideos = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    const newVideos = await fetchVideos(page, 10);
    setVideos(prev => [...prev, ...newVideos]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, loading]);
  
  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      { threshold: 1.0 }
    );
    
    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) observer.observe(sentinel);
    
    return () => observer.disconnect();
  }, [loadMoreVideos]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
      <div id="load-more-sentinel" className="h-10" />
    </div>
  );
};
```

## 🏆 Technical Achievements

### What We Accomplished

- ✅ **Complete WebRTC Implementation**: Peer-to-peer video calls with signaling server
- ✅ **Professional Screen Recording**: MediaRecorder API with camera overlay
- ✅ **Real-time Signaling**: Socket.io server for WebRTC coordination
- ✅ **Cloud Video Pipeline**: Cloudinary integration with automatic thumbnails
- ✅ **Production Database**: Prisma + Supabase with connection pooling
- ✅ **Responsive UI/UX**: Modern design with smooth animations
- ✅ **Full-stack TypeScript**: End-to-end type safety

### Challenges Overcome

The journey wasn't without its challenges:

**🔧 WebRTC Signaling Complexity**: Managing peer connections, ice candidates, and connection states required careful orchestration.

**🔧 Browser Compatibility**: Different browsers handle MediaRecorder differently, requiring fallbacks and feature detection.

**🔧 Video Processing**: Implementing efficient video upload, compression, and thumbnail generation.

**🔧 Real-time Synchronization**: Ensuring audio and video stay perfectly synchronized during recording.

**🔧 Production Deployment**: Configuring WebRTC servers, database pooling, and CDN optimization for production.

## 🌟 Why Screener Matters

Screener demonstrates that modern web applications can rival native desktop software in functionality and performance. Key achievements include:

1. **Zero Installation**: Runs entirely in the browser
2. **Professional Quality**: Rivals tools like Zoom and Loom
3. **Real-time Collaboration**: WebRTC peer-to-peer technology
4. **Cloud-first Architecture**: Scalable and reliable
5. **Modern Tech Stack**: Built with cutting-edge technologies
6. **Production Ready**: Deployed and accessible worldwide

## 🚀 Future Enhancements

The platform is already feature-complete, but there's always room for improvement:

- **AI-powered Features**: Automatic transcription and meeting summaries
- **Advanced Recording**: Multiple camera angles and advanced editing
- **Enterprise Features**: Team management and analytics
- **Mobile Apps**: React Native companion apps
- **Integrations**: Calendar integration and third-party APIs

## 📚 Lessons Learned

Building Screener taught me valuable lessons about:

- **WebRTC Architecture**: Understanding peer-to-peer networking
- **Media APIs**: Mastering browser media capabilities
- **Real-time Systems**: Building responsive real-time applications
- **Cloud Integration**: Implementing scalable video processing
- **User Experience**: Creating intuitive interfaces for complex functionality

## 🔗 Try Screener Today

Experience the power of browser-based video collaboration:

🚀 **[Live Demo](https://screener-lemon.vercel.app)**  
💻 **[GitHub Repository](https://github.com/Flash0104/screener)**

Screener proves that with modern web technologies, we can build powerful applications that compete with native software while being instantly accessible to anyone with a browser.

---

*Have you built similar WebRTC applications? What challenges did you face? I'd love to hear about your experiences in the comments below!* 