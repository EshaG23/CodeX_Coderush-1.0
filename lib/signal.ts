// Simple biquad filters based on RBJ cookbook formulas

type Biquad = {
	// feedforward
	b0: number
	b1: number
	b2: number
	// feedback
	a0: number
	a1: number
	a2: number
}

function biquadProcess(samples: number[], coef: Biquad): number[] {
	const out: number[] = new Array(samples.length)
	let x1 = 0, x2 = 0, y1 = 0, y2 = 0
	const { b0, b1, b2, a0, a1, a2 } = coef
	for (let i = 0; i < samples.length; i++) {
		const x0 = samples[i]
		const y0 = (b0 / a0) * x0 + (b1 / a0) * x1 + (b2 / a0) * x2 - (a1 / a0) * y1 - (a2 / a0) * y2
		out[i] = y0
		x2 = x1
		x1 = x0
		y2 = y1
		y1 = y0
	}
	return out
}

function makeLowpass(sampleRate: number, cutoffHz: number, q = Math.SQRT1_2): Biquad {
	const w0 = (2 * Math.PI * cutoffHz) / sampleRate
	const cosw0 = Math.cos(w0)
	const sinw0 = Math.sin(w0)
	const alpha = sinw0 / (2 * q)
	const b0 = (1 - cosw0) / 2
	const b1 = 1 - cosw0
	const b2 = (1 - cosw0) / 2
	const a0 = 1 + alpha
	const a1 = -2 * cosw0
	const a2 = 1 - alpha
	return { b0, b1, b2, a0, a1, a2 }
}

function makeHighpass(sampleRate: number, cutoffHz: number, q = Math.SQRT1_2): Biquad {
	const w0 = (2 * Math.PI * cutoffHz) / sampleRate
	const cosw0 = Math.cos(w0)
	const sinw0 = Math.sin(w0)
	const alpha = sinw0 / (2 * q)
	const b0 = (1 + cosw0) / 2
	const b1 = -(1 + cosw0)
	const b2 = (1 + cosw0) / 2
	const a0 = 1 + alpha
	const a1 = -2 * cosw0
	const a2 = 1 - alpha
	return { b0, b1, b2, a0, a1, a2 }
}

export function bandpass(samples: number[], sampleRate: number, lowHz = 0.5, highHz = 40): number[] {
	if (!samples.length || !Number.isFinite(sampleRate) || sampleRate <= 1) return samples
	const low = Math.max(0.001, Math.min(lowHz, sampleRate / 2 - 1))
	const high = Math.max(low + 0.1, Math.min(highHz, sampleRate / 2 - 1))
	const hp = makeHighpass(sampleRate, low)
	const lp = makeLowpass(sampleRate, high)
	const afterHp = biquadProcess(samples, hp)
	return biquadProcess(afterHp, lp)
}


