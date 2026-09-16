import { Project, SkillCategory, ExperienceItem, Testimonial, StackRecipe } from '../types';

export const PERSONAL_INFO = {
  name: 'Moe Kyaw Aung',
  handle: 'mka_dev',
  role: 'Senior Full-Stack Architect & Creative Technologist',
  tagline: 'Architecting resilient distributed systems, sub-millisecond real-time web applications, and hyper-fluid WebGL cybernetic interfaces.',
  location: 'Singapore (UTC+8) // Remote Worldwide',
  status: 'ONLINE // OPEN TO SELECT CONTRACTS & LEAD ROLES',
  clearance: 'LEVEL_09 // SEC_ARCH',
  experienceYears: '8+',
  uptimeRecord: '99.995%',
  eventsProcessedDaily: '50M+',
  avgLatency: '< 12ms',
  email: 'moe.kyawaung.dev@gmail.com',
  secondaryEmail: 'contact@moekyawaung.com',
  github: 'https://github.com/moekyawaung',
  linkedin: 'https://linkedin.com/in/moekyawaung',
  twitter: 'https://twitter.com/moekyawaung',
  telegram: 'https://t.me/moekyawaung',
  discord: 'moekyawaung#0001',
  gpgKeyId: '4A8F 9C21 B03E 77D2',
  avatar: '/images/moe-avatar.jpg',
  aboutBio: `Moe Kyaw Aung is a Senior Full-Stack Software Architect and Creative Technologist with over 8 years of battle-tested engineering experience building planetary-scale web applications, low-latency distributed event meshes, and GPU-accelerated web experiences.

Specializing in the intersection of high-throughput backend systems (Go, Rust, Node.js) and modern reactive user interfaces (React 19, TypeScript, WebGL/Three.js), Moe has architected distributed platforms that power tens of millions of real-time transactions daily with sub-15ms edge latencies.

Currently based in Singapore, he collaborates with forward-thinking tech enterprises, fintech leaders, and high-growth AI startups worldwide.`
};

export const TELEMETRY_METRICS = [
  { label: 'PROD UPTIME MAINTAINED', value: '99.995%', change: '+0.002%', badge: 'SLA TARGET' },
  { label: 'DAILY DISTRIBUTED EVENTS', value: '50M+', change: '+12.4M', badge: 'PEAK IOPS' },
  { label: 'GLOBAL EDGE LATENCY', value: '< 12ms', change: '-4.2ms', badge: 'SUB-MS READY' },
  { label: 'PRODUCTION SERVICES', value: '140+', change: '99% CI/CD', badge: 'K8S MESH' },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'nexus-cloud',
    title: 'NexusCloud Edge Mesh',
    subtitle: 'Ultra low-latency distributed event streaming engine & edge computing layer',
    category: 'Distributed Systems',
    description: 'A distributed edge computing and real-time pub/sub event mesh capable of processing 50M+ events per day with under 10ms end-to-end latency.',
    longDescription: 'NexusCloud Edge Mesh was designed to bridge cloud regions and edge clusters with an intelligent eBPF-routed gossip protocol. Features automated failover, dynamic bandwidth throttling, end-to-end payload encryption, and real-time telemetry streaming over WebSockets and gRPC.',
    image: '/images/project-nexus-cloud.jpg',
    tags: ['Go', 'Rust', 'Kafka', 'eBPF', 'Docker', 'Kubernetes', 'WebSockets', 'Prometheus'],
    metrics: [
      { label: 'Throughput', value: '120k req/sec' },
      { label: 'P99 Latency', value: '8.4 ms' },
      { label: 'Cluster Nodes', value: '64 Global' },
      { label: 'Bandwidth Saved', value: '42%' }
    ],
    challenges: [
      'Eliminated head-of-line blocking under multi-region packet loss using custom QUIC stream multiplexing.',
      'Achieved sub-10ms P99 latency by implementing zero-copy memory buffers in Rust.',
      'Constructed a fault-tolerant Raft consensus engine handling automatic leader elections in under 150ms.'
    ],
    architecture: [
      { layer: 'Edge & Ingress', tech: ['Cloudflare Workers', 'Envoy Proxy', 'QUIC/HTTP3'], description: 'Edge TLS termination and Geo-DNS routing' },
      { layer: 'Compute Layer', tech: ['Go microservices', 'Rust worker daemons', 'eBPF'], description: 'Zero-copy packet processing and event filtering' },
      { layer: 'Event Mesh', tech: ['Apache Kafka', 'NATS JetStream', 'Redis Streams'], description: 'Persistent distributed stream pub/sub' },
      { layer: 'Storage & Telemetry', tech: ['ClickHouse', 'Prometheus', 'Grafana'], description: 'Real-time time-series aggregation' }
    ],
    githubUrl: 'https://github.com/moekyawaung/nexus-cloud-mesh',
    liveUrl: 'https://nexus-mesh.moekyawaung.dev',
    featured: true,
    sandboxType: 'event-stream',
    codeSnippet: {
      language: 'go',
      filename: 'mesh/stream_node.go',
      code: `// NexusCloud Edge Stream Dispatcher
package mesh

import (
	"context"
	"sync/atomic"
	"time"
)

type EventNode struct {
	ID        string
	Ingress   chan *StreamPacket
	Outbox    chan *StreamPacket
	Counter   atomic.Uint64
	LatencyP99 time.Duration
}

func (n *EventNode) DispatchStream(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case pkt := <-n.Ingress:
			// Zero-copy ring buffer validation
			if pkt.VerifySignature() {
				n.Counter.Add(1)
				n.Outbox <- pkt.CompressZstd()
			}
		}
	}
}`
    }
  },
  {
    id: 'neural-mesh',
    title: 'NeuralMesh AI Studio',
    subtitle: 'Collaborative multi-agent LLM workflow orchestrator with vector semantic recall',
    category: 'AI & LLMs',
    description: 'An enterprise-grade generative AI orchestration platform providing real-time multi-agent reasoning, interactive node-graph visual workflows, and sub-second vector retrieval.',
    longDescription: 'NeuralMesh allows engineers to construct complex asynchronous agent DAGs (Directed Acyclic Graphs) with branching evaluation steps, human-in-the-loop approvals, and dynamic fallback models. Integrates with vector embeddings databases to deliver contextual semantic memory.',
    image: '/images/project-neural-mesh.jpg',
    tags: ['React 19', 'TypeScript', 'Python', 'FastAPI', 'Pinecone', 'OpenAI', 'Tailwind CSS', 'WebSockets'],
    metrics: [
      { label: 'Agent Executions', value: '4.2M / mo' },
      { label: 'Token Efficiency', value: '+38% saved' },
      { label: 'Avg Step Speed', value: '310 ms' },
      { label: 'Active Graphs', value: '1,800+' }
    ],
    challenges: [
      'Built custom DAG topological sort engine executing concurrent non-dependent agent prompts in parallel.',
      'Implemented optimistic UI streaming updates with token-by-token WebSockets streaming and smooth markdown AST rendering.',
      'Developed dynamic token compression algorithm reducing LLM context window costs by 38%.'
    ],
    architecture: [
      { layer: 'Frontend Studio', tech: ['React 19', 'Zustand', 'React Flow', 'Canvas'], description: 'Visual node graph designer with live execution HUD' },
      { layer: 'API Gateway', tech: ['Node.js', 'Fastify', 'WebSockets'], description: 'Streaming socket session multiplexing' },
      { layer: 'AI Agent Runtime', tech: ['Python', 'FastAPI', 'LangChain/LlamaIndex'], description: 'Asynchronous DAG worker nodes and tool execution' },
      { layer: 'Vector Memory', tech: ['Pinecone', 'Redis Vector', 'PostgreSQL pgvector'], description: 'Sub-5ms semantic similarity search' }
    ],
    githubUrl: 'https://github.com/moekyawaung/neural-mesh-studio',
    liveUrl: 'https://neural-mesh.moekyawaung.dev',
    featured: true,
    sandboxType: 'llm-mesh',
    codeSnippet: {
      language: 'typescript',
      filename: 'agents/orchestrator.ts',
      code: `// Multi-Agent Workflow Execution Engine
export async function executeAgentDAG(graph: AgentWorkflowDAG, initialPayload: AgentContext) {
  const resolvedNodes = new Set<string>();
  const executionContext = new Map<string, AgentResponse>();

  while (resolvedNodes.size < graph.nodes.length) {
    const readyNodes = graph.nodes.filter(
      node => !resolvedNodes.has(node.id) &&
      node.dependencies.every(depId => resolvedNodes.has(depId))
    );

    await Promise.all(readyNodes.map(async (agent) => {
      const inputs = agent.dependencies.map(id => executionContext.get(id));
      const result = await agent.runPrompt(inputs, initialPayload);
      executionContext.set(agent.id, result);
      resolvedNodes.add(agent.id);
    }));
  }

  return executionContext;
}`
    }
  },
  {
    id: 'quantum-ledger',
    title: 'QuantumLedger Core',
    subtitle: 'High-throughput decentralized financial settlement engine with zero-knowledge proofs',
    category: 'Web3 & Fintech',
    description: 'A cryptographic settlement platform with atomic transaction guarantees, zk-SNARK proof verification, and institutional audit trails.',
    longDescription: 'QuantumLedger processes high-frequency institutional asset settlements with non-custodial cryptographic guarantees. Integrates off-chain state channels with on-chain rollup anchoring to achieve 25,000 TPS.',
    image: '/images/project-quantum-ledger.jpg',
    tags: ['Rust', 'Solidity', 'Go', 'Next.js', 'Redis', 'PostgreSQL', 'Web3.js', 'Docker'],
    metrics: [
      { label: 'Settlement TPS', value: '25,000 TPS' },
      { label: 'Total Settled', value: '$840M+ USD' },
      { label: 'Finality Time', value: '1.2 sec' },
      { label: 'Zero Breaches', value: '100% Secure' }
    ],
    challenges: [
      'Implemented recursive zk-SNARK rollup batching reducing gas verification overhead by 92%.',
      'Designed double-spend prevention state machine handling concurrent high-velocity balance locks.',
      'Created automated compliance circuit validator running in under 40 milliseconds per transaction.'
    ],
    architecture: [
      { layer: 'DApp UI & Web3 SDK', tech: ['Next.js', 'Wagmi', 'Tailwind', 'Ethers'], description: 'Responsive institutional treasury cockpit' },
      { layer: 'Batch Sequencer', tech: ['Go', 'Raft Consensus', 'BadgerDB'], description: 'High-speed FIFO ordering and state transition validator' },
      { layer: 'ZK Prover Node', tech: ['Rust', 'Halo2', 'Arkworks'], description: 'Recursive proof generation pipeline' },
      { layer: 'Ledger Store', tech: ['PostgreSQL', 'Redis Cluster', 'RocksDB'], description: 'Immutable state root checkpoints' }
    ],
    githubUrl: 'https://github.com/moekyawaung/quantum-ledger-core',
    liveUrl: 'https://quantum-ledger.moekyawaung.dev',
    featured: true,
    sandboxType: 'crypto-settle',
    codeSnippet: {
      language: 'rust',
      filename: 'src/engine/settlement.rs',
      code: `// QuantumLedger Atomic Batch Verifier
pub struct SettlementBatch {
    pub batch_id: u64,
    pub tx_count: usize,
    pub state_root_before: [u8; 32],
    pub state_root_after: [u8; 32],
    pub zk_proof: Vec<u8>,
}

impl SettlementBatch {
    pub fn verify_and_commit(&self, ledger: &mut LedgerStore) -> Result<bool, EngineError> {
        if !verify_snark_proof(&self.zk_proof, &self.state_root_after) {
            return Err(EngineError::InvalidProof);
        }
        ledger.commit_state_checkpoint(self.batch_id, self.state_root_after)?;
        Ok(true)
    }
}`
    }
  },
  {
    id: 'cyber-matrix-3d',
    title: 'CyberMatrix 3D Engine',
    subtitle: 'GPU-accelerated WebGL wireframe sandbox & interactive node-graph shader workspace',
    category: 'WebGL / 3D',
    description: 'A WebGL 2.0 / WebAssembly real-time 3D simulation engine rendering 100,000+ interactive neon particles, volumetric lighting, and custom GLSL compute shaders.',
    longDescription: 'Created as a creative technology laboratory, CyberMatrix delivers buttery smooth 60fps / 120fps graphics directly in modern browsers. Features GLSL hot-reloading, post-processing bloom pipelines, and audio-reactive frequency modulators.',
    image: '/images/project-cyber-engine.jpg',
    tags: ['Three.js', 'WebGL 2.0', 'GLSL', 'TypeScript', 'WebAssembly', 'Web Audio API', 'Vite'],
    metrics: [
      { label: 'Particles at 60fps', value: '150,000+' },
      { label: 'Shader Compilation', value: '< 25 ms' },
      { label: 'GPU Draw Calls', value: '1 Batched' },
      { label: 'Bundle Size', value: '86 KB Gzip' }
    ],
    challenges: [
      'Engineered GPGPU ping-pong framebuffer simulation for particle physics entirely on GPU compute shaders.',
      'Achieved zero garbage collection pauses during intensive audio-reactive animations.',
      'Built interactive GLSL code editor with real-time error parsing and syntax highlighting.'
    ],
    architecture: [
      { layer: 'Shader Workspace', tech: ['Monaco Editor', 'React 19', 'GLSL Parser'], description: 'Live code IDE with live uniforms binding' },
      { layer: 'Render Pipeline', tech: ['WebGL 2.0', 'Three.js', 'Custom FBO'], description: 'Multi-pass bloom, chromatic aberration, scanlines' },
      { layer: 'Math & Physics', tech: ['WebAssembly (Rust)', 'SIMD Vectors'], description: 'High-performance spatial partitioning algorithms' }
    ],
    githubUrl: 'https://github.com/moekyawaung/cyber-matrix-engine',
    liveUrl: 'https://cyber-matrix.moekyawaung.dev',
    featured: true,
    sandboxType: 'webgl-shader',
    codeSnippet: {
      language: 'glsl',
      filename: 'shaders/neon_grid.frag',
      code: `// Cyber Matrix Neon Horizon Fragment Shader
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uNeonColor;
varying vec2 vUv;

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    float grid = abs(sin(p.x * 20.0 + uTime * 0.5)) * abs(sin(p.y * 20.0));
    grid = smoothstep(0.02, 0.0, grid);
    
    vec3 col = mix(vec3(0.01, 0.02, 0.05), uNeonColor, grid * 1.5);
    gl_FragColor = vec4(col, 1.0);
}`
    }
  },
  {
    id: 'hyperscale-gateway',
    title: 'HyperScale Zero-Trust Gateway',
    subtitle: 'Dynamic rate limiting, token bucket synchronization & distributed microservice routing',
    category: 'Cloud & DevOps',
    description: 'An enterprise API Gateway handling 200M+ monthly requests with distributed sliding window token bucket rate limiters, JWT authorization, and circuit breakers.',
    longDescription: 'HyperScale Gateway sits at the frontline of microservice ecosystems, preventing cascading failures with adaptive backpressure, distributed Redis synchronization, and instant canary rollouts.',
    image: '/images/project-nexus-cloud.jpg',
    tags: ['Go', 'Envoy', 'Redis', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'],
    metrics: [
      { label: 'Req Inspected/Mo', value: '200M+' },
      { label: 'Rate-Limit Delay', value: '< 0.8 ms' },
      { label: 'Uptime', value: '99.999%' },
      { label: 'Security Blocks', value: '3.4M Threats' }
    ],
    challenges: [
      'Implemented distributed atomic Lua scripts in Redis maintaining microsecond rate-limit synchronization across 12 pods.',
      'Constructed zero-downtime hot config reloader with Go channels and atomic pointers.',
      'Configured automated DDoS detection heuristics mitigating Layer-7 volumetric attacks in under 5 seconds.'
    ],
    architecture: [
      { layer: 'Ingress & TLS', tech: ['AWS NLB', 'Envoy Proxy', 'Let\'s Encrypt'], description: 'Layer-4 / Layer-7 traffic distribution' },
      { layer: 'Gateway Core', tech: ['Go', 'Fiber', 'OpenTelemetry'], description: 'Auth verification, rate limiting, header transformation' },
      { layer: 'State & Cache', tech: ['Redis Cluster', 'Local LRU Memory Cache'], description: 'Two-tier hierarchical token bucket store' }
    ],
    githubUrl: 'https://github.com/moekyawaung/hyperscale-gateway',
    liveUrl: 'https://hyperscale.moekyawaung.dev',
    featured: false,
    sandboxType: 'rate-limiter',
    codeSnippet: {
      language: 'go',
      filename: 'gateway/ratelimit.go',
      code: `// HyperScale Distributed Sliding-Window Rate Limiter
func (rl *RateLimiter) AllowRequest(ctx context.Context, apiKey string, limit int64, window time.Duration) (bool, int64, error) {
    now := time.Now().UnixNano()
    clearBefore := now - window.Nanoseconds()
    
    pipe := rl.redisClient.TxPipeline()
    pipe.ZRemRangeByScore(ctx, apiKey, "0", strconv.FormatInt(clearBefore, 10))
    pipe.ZAdd(ctx, apiKey, redis.Z{Score: float64(now), Member: now})
    countCmd := pipe.ZCard(ctx, apiKey)
    pipe.Expire(ctx, apiKey, window)
    
    _, err := pipe.Exec(ctx)
    if err != nil { return false, 0, err }
    
    currCount := countCmd.Val()
    return currCount <= limit, limit - currCount, nil
}`
    }
  },
  {
    id: 'aether-vector-db',
    title: 'AetherDB Vector Search Engine',
    subtitle: 'Embedded in-memory HNSW vector indexer optimized for sub-3ms cosine similarity search',
    category: 'Distributed Systems',
    description: 'A lightweight vector database engine written in Rust with Python and Node.js FFI bindings, supporting millions of high-dimensional embeddings for real-time RAG systems.',
    longDescription: 'AetherDB utilizes Hierarchical Navigable Small World (HNSW) graphs and SIMD vector quantization to perform blazing-fast semantic searches on CPU without requiring heavy GPU clusters.',
    image: '/images/project-neural-mesh.jpg',
    tags: ['Rust', 'SIMD', 'C++', 'WebAssembly', 'Python', 'TypeScript', 'gRPC'],
    metrics: [
      { label: 'Search Latency', value: '1.9 ms P95' },
      { label: 'Recall Accuracy', value: '99.4%' },
      { label: 'Memory Footprint', value: '65% Lower' },
      { label: 'Concurrent Queries', value: '18k QPS' }
    ],
    challenges: [
      'Harnessed AVX-512 and NEON SIMD intrinsics for 8x faster dot-product vector arithmetic.',
      'Constructed lock-free concurrent graph mutation for real-time document insertion while serving read traffic.',
      'Packaged as a zero-dependency WebAssembly binary for client-side vector search in browser sandboxes.'
    ],
    architecture: [
      { layer: 'FFI & Bindings', tech: ['PyO3', 'Neon Node.js', 'WASM'], description: 'Zero-overhead multi-language bindings' },
      { layer: 'Graph Engine', tech: ['Rust HNSW', 'SIMD Intrinsics', 'Bit-Quantization'], description: 'Multi-layer hierarchical search graphs' },
      { layer: 'Persistence', tech: ['Memory-mapped files (mmap)', 'WAL log'], description: 'Instant cold restarts with zero memory deserialization delay' }
    ],
    githubUrl: 'https://github.com/moekyawaung/aether-vector-engine',
    liveUrl: 'https://aether-db.moekyawaung.dev',
    featured: false,
    sandboxType: 'vector-query',
    codeSnippet: {
      language: 'rust',
      filename: 'src/hnsw/simd_cosine.rs',
      code: `// AetherDB SIMD-Accelerated Cosine Distance
#[inline(always)]
pub fn simd_cosine_similarity(a: &[f32], b: &[f32]) -> f32 {
    assert_eq!(a.len(), b.len());
    let mut dot_prod = 0.0f32;
    let mut norm_a = 0.0f32;
    let mut norm_b = 0.0f32;

    for (x, y) in a.iter().zip(b.iter()) {
        dot_prod += x * y;
        norm_a += x * x;
        norm_b += y * y;
    }

    dot_prod / (norm_a.sqrt() * norm_b.sqrt() + 1e-10)
}`
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend & Cyber Visuals',
    description: 'Hyper-fluid user interfaces, reactive state graphs, 3D WebGL rendering, and responsive systems.',
    iconName: 'Layout',
    skills: [
      { name: 'React 19 & Next.js', level: 98, years: 7, highlight: 'Server Components, Concurrent Mode, Optimistic UI', tags: ['React', 'Next.js', 'SSR', 'RSC'] },
      { name: 'TypeScript', level: 96, years: 7, highlight: 'Strict Type Systems, Generic Metaprogramming', tags: ['TypeScript', 'ESNext'] },
      { name: 'WebGL & Three.js', level: 90, years: 5, highlight: 'Custom GLSL Shaders, 3D Particle Systems, Canvas', tags: ['Three.js', 'GLSL', 'Shaders'] },
      { name: 'Tailwind CSS & Design Systems', level: 96, years: 6, highlight: 'Micro-interactions, Cyberpunk UI, Responsive Architecture', tags: ['Tailwind', 'CSS3', 'Framer'] },
      { name: 'WebSockets & WebAudio API', level: 92, years: 6, highlight: 'Sub-10ms duplex packet streaming & real-time synthesizers', tags: ['WebSockets', 'WebAudio', 'WebRTC'] }
    ]
  },
  {
    id: 'backend',
    title: 'Distributed Systems & Backend',
    description: 'High-throughput microservices, real-time message streams, low-latency concurrent engines.',
    iconName: 'Server',
    skills: [
      { name: 'Go (Golang)', level: 95, years: 6, highlight: 'Goroutine concurrency, high-throughput RPC, low-latency microservices', tags: ['Go', 'gRPC', 'Gin', 'Fiber'] },
      { name: 'Rust', level: 88, years: 4, highlight: 'Memory-safe systems programming, SIMD optimization, WebAssembly', tags: ['Rust', 'Tokio', 'Actix', 'Wasm'] },
      { name: 'Node.js & Bun', level: 96, years: 8, highlight: 'Event loop tuning, async streaming pipelines, Fastify, NestJS', tags: ['Node.js', 'Bun', 'Fastify', 'Express'] },
      { name: 'Python & FastAPI', level: 90, years: 5, highlight: 'Async API frameworks, AI agent orchestration, data processing', tags: ['Python', 'FastAPI', 'PyTorch', 'LangChain'] },
      { name: 'gRPC & Protocol Buffers', level: 92, years: 5, highlight: 'Binary serialization, streaming RPCs, schema contracts', tags: ['gRPC', 'Protobuf', 'Microservices'] }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud, Infrastructure & DevOps',
    description: 'Resilient multi-cloud orchestration, container clustering, edge delivery, and zero-trust security.',
    iconName: 'Cloud',
    skills: [
      { name: 'Kubernetes & Docker', level: 94, years: 6, highlight: 'Multi-cluster deployments, Helm charts, Service Meshes (Istio)', tags: ['Kubernetes', 'Docker', 'K8s', 'Helm'] },
      { name: 'AWS & Cloudflare Edge', level: 95, years: 7, highlight: 'ECS, EKS, Lambda, S3, Cloudflare Workers, Edge Caching', tags: ['AWS', 'Cloudflare', 'Serverless'] },
      { name: 'Terraform & IaC', level: 89, years: 5, highlight: 'Automated reproducible multi-region infrastructure pipelines', tags: ['Terraform', 'IaC', 'Ansible'] },
      { name: 'CI/CD & GitOps', level: 93, years: 7, highlight: 'GitHub Actions, ArgoCD, automated canary verification tests', tags: ['GitHub Actions', 'ArgoCD', 'GitOps'] },
      { name: 'Observability & Telemetry', level: 91, years: 6, highlight: 'Prometheus, Grafana, OpenTelemetry, distributed tracing', tags: ['Prometheus', 'Grafana', 'OTel'] }
    ]
  },
  {
    id: 'databases',
    title: 'Databases, Cache & Vectors',
    description: 'Distributed persistence, in-memory caching layers, high-velocity streaming queues, and vector stores.',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL & pgvector', level: 96, years: 8, highlight: 'Query optimization, indexing strategies, partitioning, vector search', tags: ['PostgreSQL', 'pgvector', 'SQL'] },
      { name: 'Redis & Dragonfly', level: 96, years: 7, highlight: 'Distributed lock patterns, pub/sub meshes, token bucket limiters', tags: ['Redis', 'Dragonfly', 'In-Memory'] },
      { name: 'Kafka & NATS', level: 90, years: 5, highlight: 'Event sourcing, high-throughput log compaction, dead-letter queues', tags: ['Kafka', 'NATS JetStream', 'PubSub'] },
      { name: 'Vector DBs (Pinecone, Qdrant)', level: 89, years: 3, highlight: 'Semantic RAG embeddings, HNSW indexing, Cosine similarity', tags: ['Pinecone', 'Qdrant', 'Vector DB'] },
      { name: 'ClickHouse & TimeSeries', level: 87, years: 4, highlight: 'Columnar analytics, petabyte-scale aggregation queries', tags: ['ClickHouse', 'TimescaleDB', 'OLAP'] }
    ]
  }
];

export const STACK_RECIPES: StackRecipe[] = [
  {
    id: 'recipe-1',
    title: 'Ultra-Fast Real-Time Event Engine',
    techs: ['Go', 'Kafka', 'Redis', 'WebSockets', 'React 19'],
    category: 'Real-time Streaming',
    diagram: [
      '[ Client Browser (React 19) ]',
      '        │  (WebSocket duplex connection)',
      '        ▼',
      '[ Go Ingress Gateway (Fiber / Epoll) ]',
      '        │  (Zstd compressed batching)',
      '        ▼',
      '[ Apache Kafka Message Partition ]',
      '   ├──► [ Redis Cluster (Sub-millisecond Session Cache) ]',
      '   └──► [ ClickHouse (Real-time Analytics Ingestion) ]'
    ],
    explanation: 'Designed for sub-10ms delivery of live financial feeds and multiplayer state updates. Utilizes Go epoll socket handlers, zero-copy buffer pooling, and Redis for volatile state.',
    useCase: 'Trading terminals, live telemetry dashboards, high-volume event dispatchers.',
    throughput: '150,000+ msgs/sec'
  },
  {
    id: 'recipe-2',
    title: 'Enterprise Multi-Agent AI Engine',
    techs: ['Python', 'FastAPI', 'Rust (Wasm)', 'Pinecone', 'Next.js'],
    category: 'Generative AI Architecture',
    diagram: [
      '[ Next.js 15 Client HUD ]',
      '        │  (SSE Streaming & DAG Nodes)',
      '        ▼',
      '[ FastAPI Async Orchestrator (Python) ]',
      '   ├──► [ Rust Vector Indexer (SIMD Embeddings) ]',
      '   ├──► [ Pinecone Serverless Vector Store ]',
      '   └──► [ LLM Model Router (Claude 3.7 / GPT-4o) ]'
    ],
    explanation: 'Asynchronous multi-agent execution pipeline with semantic vector recall, guardrails filtering, and dynamic token context window pruning.',
    useCase: 'Autonomous code review bots, real-time knowledge graph synthesis, enterprise RAG copilots.',
    throughput: 'Sub-300ms step latency'
  },
  {
    id: 'recipe-3',
    title: 'Global Zero-Trust Edge Platform',
    techs: ['Cloudflare Workers', 'Kubernetes', 'Envoy', 'Terraform', 'PostgreSQL'],
    category: 'Cloud & Infrastructure',
    diagram: [
      '[ Global Visitors (Anycast DNS) ]',
      '        │',
      '[ Cloudflare Edge Workers (WAF + JWT Validation) ]',
      '        │  (mTLS Encrypted Tunnel)',
      '        ▼',
      '[ AWS EKS Multi-Region Kubernetes Cluster ]',
      '   ├──► [ Envoy Service Mesh (Canary Routing) ]',
      '   └──► [ PostgreSQL with PgBouncer Pooling ]'
    ],
    explanation: 'Geo-distributed architecture with zero single points of failure, automated canary traffic shifting, and sub-second failover recovery.',
    useCase: 'Mission-critical SaaS platforms, financial services, enterprise API gateways.',
    throughput: '99.999% SLA Uptime'
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Staff Distributed Systems Architect',
    company: 'Apex Distributed Labs',
    location: 'Singapore // Remote',
    type: 'Full-Time',
    period: '2023 — PRESENT',
    current: true,
    description: 'Leading system architecture and distributed real-time platform engineering across APAC and US regions.',
    highlights: [
      'Architected and deployed high-throughput event processing platform processing 50M+ events/day with 99.995% uptime SLA.',
      'Reduced cloud infrastructure expenditure by 34% through Go service refactoring and Kubernetes auto-scaler tuning.',
      'Mentored 14 senior engineers in distributed concurrency patterns, zero-downtime database migrations, and eBPF observability.'
    ],
    techStack: ['Go', 'Rust', 'Kafka', 'Kubernetes', 'Redis', 'AWS', 'TypeScript', 'React 19'],
    metrics: ['50M+ Daily Events', '34% Cloud Cost Reduced', '8.4ms P99 Latency']
  },
  {
    id: 'exp-2',
    role: 'Lead Full-Stack Engineer',
    company: 'NeuroByte Cybernetics',
    location: 'Singapore',
    type: 'Full-Time',
    period: '2021 — 2023',
    current: false,
    description: 'Directed frontend and backend engineering teams building enterprise AI data synthesis and visualization platforms.',
    highlights: [
      'Built interactive 3D WebGL data visualization dashboard visualizing 200,000+ data points smoothly at 60fps.',
      'Architected multi-tenant GraphQL API gateway reducing client over-fetching by 65% and speeding up mobile load times.',
      'Established strict CI/CD pipelines with automated end-to-end load testing using k6 and GitHub Actions.'
    ],
    techStack: ['TypeScript', 'React', 'Three.js', 'Node.js', 'Fastify', 'GraphQL', 'Docker', 'PostgreSQL'],
    metrics: ['65% Payload Reduction', '60 FPS 3D Visualizer', '120k Monthly Active Users']
  },
  {
    id: 'exp-3',
    role: 'Senior Systems Engineer',
    company: 'Horizon Cloud Scale',
    location: 'Singapore',
    type: 'Full-Time',
    period: '2019 — 2021',
    current: false,
    description: 'Engineered microservices and caching tiers for high-traffic financial intelligence applications.',
    highlights: [
      'Engineered real-time price streaming microservice handling 40,000 concurrent WebSocket connections using Go and Redis.',
      'Migrated legacy monolithic applications into containerized Docker/Kubernetes microservices with zero downtime.',
      'Authored automated deployment runbooks and Prometheus alert routing reducing incident mean-time-to-resolution (MTTR) by 50%.'
    ],
    techStack: ['Go', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL', 'Terraform', 'React'],
    metrics: ['40k Concurrent Sockets', '50% MTTR Reduction', 'Zero Downtime Migration']
  },
  {
    id: 'exp-4',
    role: 'Full-Stack Software Engineer',
    company: 'Quantum Interactive Solutions',
    location: 'Singapore',
    type: 'Full-Time',
    period: '2017 — 2019',
    current: false,
    description: 'Developed full-stack web applications, RESTful APIs, and custom frontend dashboards for enterprise clients.',
    highlights: [
      'Built single-page enterprise applications with React, Redux, and TypeScript, delivering 98+ Google Lighthouse scores.',
      'Implemented secure OAuth2 / JWT authentication pipelines and role-based access control (RBAC).',
      'Spearheaded automated testing adoption resulting in 85% code coverage across core business modules.'
    ],
    techStack: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    metrics: ['98+ Lighthouse Score', '85% Test Coverage', '15+ Shipped Features']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Alexander Chen',
    role: 'VP of Engineering',
    company: 'Apex Distributed Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Moe is among the rarest tier of engineers who can seamlessly design low-level distributed Go/Rust kernels and then turn around to build breathtaking, silky-smooth WebGL interfaces. His architectural clarity and speed of delivery transformed our platform.',
    relationship: 'Managed Moe directly at Apex Labs',
    verified: true
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Chief Technology Officer',
    company: 'NeuroByte Systems',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'Under Moe\'s technical leadership, our engineering velocity doubled. He spearheaded our migration to microservices while maintaining an impeccable 99.99% uptime record. An absolute powerhouse architect.',
    relationship: 'Executive Supervisor at NeuroByte',
    verified: true
  },
  {
    id: 't-3',
    name: 'Marcus Vance',
    role: 'Principal Cloud Architect',
    company: 'Horizon Cloud',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Moe possesses an exceptional depth in systems performance, networking protocols, and modern React patterns. Any engineering team that secures Moe is gaining an immediate 10x multiplier in capability.',
    relationship: 'Colleague on Core Infrastructure',
    verified: true
  }
];

export const CERTIFICATIONS = [
  { name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', year: '2024', badge: 'SAP-C02' },
  { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Cloud Native Computing Foundation (CNCF)', year: '2023', badge: 'CKA-9921' },
  { name: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp', year: '2023', badge: 'TA-003' },
  { name: 'Distributed Systems & Concurrency Specialization', issuer: 'ACM / Stanford Online', year: '2022', badge: 'HONORS' }
];
